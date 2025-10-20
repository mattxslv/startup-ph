<?php

namespace App\Http\Controllers\User;

use App\Enums\OTPEnum;
use App\Http\Controllers\Controller;
use App\Mail\ResetPasswordMail;
use App\Models\Users\Requests\ChangeUserPasswordRequest;
use App\Models\Users\Requests\ForgotPasswordRequest;
use App\Models\Users\Requests\ResetPasswordRequest;
use App\Models\Users\Services\UserAuthenticationService;
use App\Models\Users\User;
use App\Services\OTPService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class PasswordController extends Controller
{
    /**
     * Change password
     *
     * @param ChangeUserPasswordRequest $request
     * @return JsonResponse
     */
    public function changePassword(ChangeUserPasswordRequest $request)
    {
        $token = (new UserAuthenticationService(auth()->user()))
            ->checkPassword($request->get('current_password'))
            ->compareCurrentPassword($request->get('password'))
            ->updatePassword($request->get('password'))
            ->authenticate();

        return response()->json(['token' => $token]);
    }

    /**
     * Forgot password
     *
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     */
    public function forgotPasssword(ForgotPasswordRequest $request)
    {
        if ($user = User::where('email', $request->get('email'))->first()) {
            (new OTPService(OTPEnum::FORGOT_PASSWORD))->sendEmail($user, ResetPasswordMail::class);
        }

        return response()->json($request->validated());
    }

    /**
     * Reset password
     *
     * @param ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function resetPasssword(ResetPasswordRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $user = User::where('email', $request->get('email'))->firstOrFail();

            (new UserAuthenticationService($user))->compareCurrentPassword($request->get('password'));

            (new OTPService(OTPEnum::FORGOT_PASSWORD))->validate($request->get('email'), $request->get('pin'));

            $token = (new UserAuthenticationService($user))
                ->updatePassword($request->get('password'))
                ->authenticate();

            return response()->json(['token' => $token]);
        });
    }
}
