<?php

namespace App\Models\Users\Traits;

use App\Enums\OTPEnum;
use App\Mail\EmailVerificationMail;
use App\Models\Users\User;
use App\Services\OTPService;

trait MustVerifyEmail
{
    /**
     * Mark the given user's email as verified.
     *
     * @return User
     */
    public function markEmailAsVerified(): User
    {
        $this->update(['email_verified_at' => $this->freshTimestamp()]);

        return $this;
    }

    /**
     * Send the email verification notification.
     *
     * @return User
     */
    public function sendEmailVerificationNotification(): User
    {
        (new OTPService(OTPEnum::EMAIL_VERIFICATION))
            ->sendEmail($this, EmailVerificationMail::class);

        return $this;
    }
}
