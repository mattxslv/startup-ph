<?php

namespace App\Http\Controllers\User;

use App\Enums\OTPEnum;
use App\Http\Controllers\Controller;
use App\Models\Users\Requests\VerifyEmailRequest;
use App\Models\Users\Requests\VerifyProfileRequest;
use App\Models\Users\Resources\UserResources;
use App\Models\Users\User;
use App\Services\OTPService;

class EmailVerificationController extends Controller
{
    /**
     * Send email verification
     *
     * @return UserResources
     */
    public function sendEmailVerification()
    {
        $user = User::authenticated()->hasVerifiedEmail(false)->sendEmailVerificationNotification();

        return new UserResources($user);
    }

    /**
     * Verify Email
     *
     * @return UserResources
     */
    public function verifyEmail(VerifyProfileRequest $request)
    {
        $user = User::authenticated()->hasVerifiedEmail(false);

        (new OTPService(OTPEnum::EMAIL_VERIFICATION))->validate($user->email, $request->get('pin'));

        $user->markEmailAsVerified();

        return new UserResources($user);
    }
}
