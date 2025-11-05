<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\User\AuthenticationController;
use App\Http\Controllers\User\EGovSSOAuthController;
use App\Http\Controllers\User\PasswordController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\RegistrationController;
use App\Http\Controllers\User\StartupApplicationController;
use App\Http\Controllers\User\StartupController;
use App\Http\Controllers\User\StartupProgramController;
use App\Http\Controllers\User\StartupRequirementController;
use Illuminate\Support\Facades\Route;

Route::prefix('user')->middleware('throttle:api')->group(function () {
    // Chatbot endpoint (public - no auth required)
    Route::post('chatbot', [ChatbotController::class, 'chat']);
    
    Route::middleware('throttle:authenticate')->group(function () {
        Route::post('email_sign_in', [RegistrationController::class, 'emailSignIn']);
        Route::post('register', [RegistrationController::class, 'register']);
        Route::post('authenticate', [AuthenticationController::class, 'authenticate']);
        Route::post('forgot_password', [PasswordController::class, 'forgotPasssword']);
        Route::post('reset_password', [PasswordController::class, 'resetPasssword']);
        Route::post('egov/sso_auth', [EGovSSOAuthController::class, 'ssoAuthByExchangeCode']);
    });

    Route::middleware(['auth:user', 'refresh.token'])->group(function () {
        Route::post('change_password', [PasswordController::class, 'changePassword']);
        Route::post('logout', [AuthenticationController::class, 'logout']);

        Route::get('profile', [ProfileController::class, 'show']);
        Route::put('profile', [ProfileController::class, 'update']);

        if (!app()->environment('production')) {
            Route::delete('profile', [ProfileController::class, 'destroy']);
        }

        Route::get('startup', [StartupController::class, 'show']);
        Route::post('startup', [StartupController::class, 'store']);

        Route::prefix('startup')->group(function () {
            Route::post('get_verified', [StartupController::class, 'submitForVerification']);
            Route::post('resubmit', [StartupController::class, 'resubmit']);
            Route::get('programs', [StartupProgramController::class, 'index']);
            Route::get('available_programs', [StartupProgramController::class, 'availablePrograms']);
            Route::get('available_programs/{program}', [StartupProgramController::class, 'showAvailablePrograms']);

            Route::apiResource('requirements', StartupRequirementController::class)->only('index', 'store')->names('user.startup.requirements');

            Route::apiResource('applications', StartupApplicationController::class)->only('index', 'store', 'show')->names('user.startup.applications');
            Route::post('applications/{application}/resubmit', [StartupApplicationController::class, 'resubmit']);
        });
    });
});
