<?php

namespace App\Services;

use App\Exceptions\InvalidOTPException;
use App\Exceptions\OTPThrottleException;
use App\Exceptions\ThrottleOTPException;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class OTPService
{
    /**
     * @var Query
     */
    protected $query;

    /**
     * @var string
     */
    protected $type;

    /**
     * @var string
     */
    protected $user;

    /**
     * OTPService constructor
     *
     * @param string $type
     */
    public function __construct(string $type)
    {
        $this->type = $type;

        $this->query = DB::table('otps');
    }

    /**
     * Send email
     *
     * @param Authenticatable $user
     * @return void
     */
    public function sendEmail(Authenticatable $user, $mailable)
    {
        $this->user = $user->email;

        $this->checkRecentlyCreatedOTP();

        Mail::to($this->user)
            ->locale(app()->getLocale())
            ->queue(new $mailable($user, $this->generatePin()));
    }

    /**
     * Validate
     *
     * @param string $user
     * @param string $pin
     * @return void
     * @throws InvalidOTPException
     */
    public function validate(string $user, string $pin)
    {
        $this->user = $user;

        $this->validatePin($pin);

        $this->query->where('user', $this->user)->delete();
    }

    /**
     * Check recenctlt created OTP
     *
     * @return void
     * @throws OTPThrottleException
     */
    protected function checkRecentlyCreatedOTP(): void
    {
        $pin = $this->query
            ->where('user', $this->user)
            ->latest('id')
            ->first();

        if ($pin) {
            $allowedAt = (new Carbon($pin->generated_at))->addMinute(config('otp.otp_rate_limit'));

            if ($allowedAt->isFuture()) {
                throw new ThrottleOTPException($allowedAt->diffInSeconds());
            }

            $this->query->where('user', $this->user)->delete();
        }
    }

    /**
     * Generate pin
     *
     * @return string
     */
    protected function generatePin(): string
    {
        $pin = '';

        for ($i = 0; $i < 6; $i++) {
            $pin .= rand(0, 9);
        }

        $this->query->insert([
            'type' => $this->type,
            'user' => $this->user,
            'pin' => bcrypt($pin),
            'generated_at' => now(),
        ]);

        return $pin;
    }

    /**
     * Validate pin
     *
     * @return void
     * @throws InvalidOTPException
     */
    protected function validatePin(string $pin): void
    {
        $hashedPin = $this->query
            ->where('type', $this->type)
            ->where('user', $this->user)
            ->latest('id')
            ->first();

        if (
            $hashedPin &&
            !(new Carbon($hashedPin->generated_at))->addMinute(config('otp.otp_validity'))->isPast() &&
            Hash::check($pin, $hashedPin->pin)
        ) {
            return;
        }

        throw new InvalidOTPException();
    }
}
