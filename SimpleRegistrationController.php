<?php

namespace App\Http\Controllers\User;

use App\Enums\OTPEnum;
use App\Http\Controllers\Controller;
use App\Models\Users\Services\UserAuthenticationService;
use App\Models\Users\User;
use App\Services\OTPService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SimpleRegistrationController extends Controller
{
    public function create(Request $request)
    {
        Log::info('SimpleRegistrationController: Create method hit.');

        $validator = Validator::make($request->all(), [
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
            'pin' => 'required|string',
        ]);

        if ($validator->fails()) {
            Log::error('SimpleRegistrationController: Validation failed.', $validator->errors()->toArray());
            return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();
        Log::info('SimpleRegistrationController: Validation passed.');

        try {
            return DB::transaction(function () use ($validated, $request) {
                Log::info('SimpleRegistrationController: DB transaction started.');

                // 1. Validate OTP
                (new OTPService(OTPEnum::REGISTRATION))->validate($validated['email'], $validated['pin']);
                Log::info('SimpleRegistrationController: OTP validation successful.');

                // 2. Check if user already exists
                if (User::where('email', $validated['email'])->exists()) {
                    Log::warning('SimpleRegistrationController: User already exists.');
                    return response()->json(['message' => 'User already exists'], 400);
                }
                Log::info('SimpleRegistrationController: User does not exist, proceeding with creation.');

                // 3. Create user
                $user = User::create([
                    'first_name' => $validated['first_name'] ?? null,
                    'last_name' => $validated['last_name'] ?? null,
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'email_verified_at' => now(),
                    'registered_at' => now(),
                ]);
                Log::info('SimpleRegistrationController: User created successfully.', ['user_id' => $user->id]);

                // 4. Authenticate and generate token
                $token = (new UserAuthenticationService($user))->authenticate();
                Log::info('SimpleRegistrationController: Authentication successful, token generated.');

                return response()->json(['token' => $token]);
            });
        } catch (\Exception $e) {
            Log::error('SimpleRegistrationController: An exception occurred.', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['message' => 'Registration failed: ' . $e->getMessage()], 500);
        }
    }
}
