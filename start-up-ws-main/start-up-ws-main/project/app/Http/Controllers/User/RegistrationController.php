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
            $status = (new UserAuthenticationService(new User()))->emailSignIn($request->get('email'));
            return response()->json(['data' => ['status' => $status]]);
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
        try {
            \Log::info('Registration attempt started', ['email' => $request->get('email')]);
            
            return DB::transaction(function () use ($request) {
                \Log::info('Inside transaction');
                
                (new OTPService(OTPEnum::REGISTRATION))->validate($request->get('email'), $request->get('pin'));
                \Log::info('OTP validated');

                if (!User::getByEmail($request->get('email'))) {
                    \Log::info('Creating new user');
                    $token = (new UserAuthenticationService(User::create($request->validated())))->authenticate();
                    \Log::info('User created and authenticated');

                    return response()->json(['token' => $token]);
                }
                
                \Log::warning('User already exists');
                return response()->json(['message' => 'User already exists'], 400);
            });
        } catch (\Exception $e) {
            \Log::error('Registration error: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json(['message' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }
}
