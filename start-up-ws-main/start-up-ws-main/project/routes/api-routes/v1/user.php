<?php

use App\Http\Controllers\User\AuthenticationController;
use App\Http\Controllers\User\EmailVerificationController;
use App\Http\Controllers\User\PasswordController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\StartupController;
use App\Http\Controllers\User\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->middleware('throttle:api')->group(function () {
    Route::middleware('throttle:authenticate')->group(function () {
        Route::post('register', [RegistrationController::class, 'register']);
        Route::post('authenticate', [AuthenticationController::class, 'authenticate']);
        Route::post('forgot_password', [PasswordController::class, 'forgotPasssword']);
        Route::post('reset_password', [PasswordController::class, 'resetPasssword']);
    });

    Route::middleware(['auth:user', 'refresh.token'])->group(function () {
        Route::post('change_password', [PasswordController::class, 'changePassword']);
        Route::post('logout', [AuthenticationController::class, 'logout']);

        Route::get('profile', [ProfileController::class, 'show']);
        Route::patch('profile', [ProfileController::class, 'patch']);
        Route::put('profile', [ProfileController::class, 'update']);

        Route::put('verify_mobile_no', [ProfileController::class, 'verifyMobileNo'])->middleware('throttle:authenticate');

        // Route::post('send_email_verification', [ProfileController::class, 'sendEmailVerification']);
        // Route::put('verify_email', [ProfileController::class, 'verifyEmail'])->middleware('throttle:authenticate');

        Route::post('send_email_verification', [EmailVerificationController::class, 'sendEmailVerification']);
        Route::post('verify_email', [EmailVerificationController::class, 'verifyEmail'])->middleware('throttle:otp');

        Route::apiResource('startups', StartupController::class)->except('destroy');
        Route::post('startups/{startup}/submit', [StartupController::class, 'submit']);

        if (!app()->environment('production')) {
            Route::delete('profile', [ProfileController::class, 'destroy']);
        }
    });
});
