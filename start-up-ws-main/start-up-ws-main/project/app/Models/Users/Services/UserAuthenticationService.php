<?php

namespace App\Models\Users\Services;

use App\Enums\OTPEnum;
use App\Exceptions\InvalidCredentialsException;
use App\Exceptions\SamePasswordException;
use App\Mail\EmailRegistrationAttemptMail;
use App\Mail\EmailVerificationMail;
use App\Models\Administrators\Administrator;
use App\Models\Users\User;
use App\Services\OTPService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserAuthenticationService
{
    /**
     * @var User $user
     */
    protected $user;

    /**
     * UserAuthenticationService constructor
     *
     * @param Administrator $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Email sign in
     *
     * @param string $email
     * @return void
     */
    public function emailSignIn(string $email)
    {
        if ($user = User::getByEmail($email)) {
            Mail::to($user)->queue(new EmailRegistrationAttemptMail($user));
        }

        if (!$user) {
            (new OTPService(OTPEnum::REGISTRATION))->sendEmail(new User(['email' => $email]), EmailVerificationMail::class);
        }
    }

    public function checkCredentials(array $credentials)
    {
        $this->checkEmail($credentials['email'])
            ->checkPassword($credentials['password']);

        return $this;
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
            $this->user = User::where('email', $email)->firstOrFail();

            return $this;
        } catch (ModelNotFoundException $e) {
            throw new InvalidCredentialsException();
        }
    }

    /**
     * Check mobile no
     *
     * @param string $email
     * @return $this
     * @throws InvalidCredentialsException
     */
    public function checkMobileNo(string $mobileNo)
    {
        try {
            $this->user = User::where('mobile_no', 'like', '%' . substr($mobileNo, -10))->firstOrFail();

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
        if (!Hash::check($password, $this->user->password)) {
            throw new InvalidCredentialsException();
        }

        return $this;
    }

    /**
     * Compare current password
     *
     * @param string $password
     * @return $this
     * @throws SamePasswordException
     */
    public function compareCurrentPassword(string $password)
    {
        if (Hash::check($password, $this->user->password)) {
            throw new SamePasswordException();
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
        $this->user->update(['password' => bcrypt($password)]);

        return $this;
    }

    /**
     * Authenticate
     *
     * @return string
     */
    public function authenticate()
    {
        $this->user->tokens()->delete();

        $this->user->update(['last_login_at' => now()]);

        $expiresAt = config('auth.session_timeout') ? now()->addMinute(config('auth.session_timeout')) : null;

        return $this->user->createToken('user', [], $expiresAt)->plainTextToken;
    }
}
