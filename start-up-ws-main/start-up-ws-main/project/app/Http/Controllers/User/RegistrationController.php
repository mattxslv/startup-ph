<?php

namespace App\Http\Controllers\User;

use App\Enums\OTPEnum;
use App\Http\Controllers\Controller;
use App\Models\Users\Requests\RegisterUserRequest;
use App\Models\Users\Requests\UserEmailSignInRequest;
use App\Models\Users\Services\UserAuthenticationService;
use App\Models\Users\User;
use App\Services\OTPService;
use Illuminate\Support\Facades\DB;

class RegistrationController extends Controller
{
    /**
     * Email sign in
     *
     * @param UserEmailSignInRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function emailSignIn(UserEmailSignInRequest $request)
    {
        try {
            (new UserAuthenticationService(new User()))->emailSignIn($request->get('email'));
            return response()->json(['data' => $request->all()]);
        } catch (\Exception $e) {
            \Log::error('Email sign in error: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 400);
        }
    }

    /**
     * Register
     *
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request)
    {
        return DB::transaction(function () use ($request) {
            (new OTPService(OTPEnum::REGISTRATION))->validate($request->get('email'), $request->get('pin'));

            if (!User::getByEmail($request->get('email'))) {
                $token = (new UserAuthenticationService(User::create($request->validated())))->authenticate();

                return response()->json(['token' => $token]);
            }
        });
    }
}
