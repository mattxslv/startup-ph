<?php

namespace App\Models\Administrators\Services;

use App\Enums\OTPEnum;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\SecondaryAuthenticationException;
use App\Mail\OtpNotificationMail;
use App\Models\Administrators\Administrator;
use App\Services\OTPService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class AdministratorAuthenticationService
{
    /**
     * @var Administrator $administrator
     */
    protected $administrator;

    /**
     * AdministratorRepository constructor
     *
     * @param Administrator $administrator
     */
    public function __construct(Administrator $administrator)
    {
        $this->administrator = $administrator;
    }

    /**
     * Check email
     *
     * @param string $email
     * @return $this
     * @throws InvalidCredentialsException
     */
    public function checkEmail(string $email)
    {
        try {
            $this->administrator = Administrator::where('email', $email)->firstOrFail();

            return $this;
        } catch (ModelNotFoundException $e) {
            throw new InvalidCredentialsException();
        }
    }

    /**
     * Check password
     *
     * @param string $password
     * @return $this
     * @throws InvalidCredentialsException
     */
    public function checkPassword(string $password)
    {
        if (!Hash::check($password, $this->administrator->password)) {
            throw new InvalidCredentialsException();
        }

        return $this;
    }

    /**
     * Update password
     *
     * @param string $password
     * @return $this
     */
    public function updatePassword(string $password)
    {
        $this->administrator->update([
            'password' => bcrypt($password),
            'with_temporary_password' => 0,
        ]);

        return $this;
    }

    /**
     * Authenticate
     *
     * @return string
     */
    public function authenticate()
    {
        $this->administrator->tokens()->delete();

        $access = $this->administrator->getAllPermissions()->pluck('name')->toArray();

        $expiresAt = config('auth.session_timeout') ? now()->addMinute(config('auth.session_timeout')) : null;

        return $this->administrator->createToken('administrator', $access, $expiresAt)->plainTextToken;
    }

    /**
     * Check secondary validation
     *
     * @return $this
     */
    public function checkSecondaryValidation()
    {
        if (config('auth.secondary_authentication_enabled')) {
            if (
                !$this->administrator->auth_validated ||
                $this->administrator->auth_validated
                    ->addMinute(config('auth.secondary_authentication_timeout'))->isPast()
            ) {
                $tokens = $this->generateAuthToken();

                throw new SecondaryAuthenticationException($tokens);
            }
        }

        return $this;
    }

    /**
    * Validate auth token
    *
    * @param string $authToken
    * @return $this
    * @throws InvalidCredentialsException
    */
    public function validateAuthToken(string $authToken)
    {
        try {
            $this->administrator = Administrator::where([
                'auth_token' => $authToken,
                'auth_validated' => null,
            ])->firstOrFail();

            return $this;
        } catch (ModelNotFoundException $e) {
            throw new InvalidCredentialsException();
        }
    }

    /**
     * Validate pin
     *
     * @param string $pin
     * @return $this
     * @throws InvalidOTPException
     */
    public function validatePin(string $pin)
    {
        (new OTPService(OTPEnum::AUTH_VALIDATION))->validate($this->administrator->email, $pin);

        return $this;
    }

    /**
     * Two factor authenticate
     *
     * @return string
     */
    public function twoFactorAuthenticate()
    {
        $this->administrator->update(['auth_validated' => now()]);

        return $this->authenticate();
    }

    /**
     * Generate auth token
     *
     * @return array
     */
    protected function generateAuthToken()
    {
        $token = str_replace('-', '', Uuid::uuid4());

        (new OTPService(OTPEnum::AUTH_VALIDATION))->sendEmail($this->administrator, OtpNotificationMail::class);

        $this->administrator->update([
            'auth_token' => $token,
            'auth_validated' => null
        ]);

        return [
            'auth_token' => $token,
        ];
    }
}
