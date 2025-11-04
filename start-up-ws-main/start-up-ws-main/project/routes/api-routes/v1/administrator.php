<?php

use App\Http\Controllers\Administrator\Access\PermissionController;
use App\Http\Controllers\Administrator\Access\PermissionGroupController;
use App\Http\Controllers\Administrator\Access\RoleController;
use App\Http\Controllers\Administrator\AdministratorController;
use App\Http\Controllers\Administrator\AuthenticationController;
use App\Http\Controllers\Administrator\ConcernController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\FeaturedStartupController;
use App\Http\Controllers\Administrator\Misc\RemarkController;
use App\Http\Controllers\Administrator\Misc\RequirementController;
use App\Http\Controllers\Administrator\Misc\SectorController;
use App\Http\Controllers\Administrator\NewsController;
use App\Http\Controllers\Administrator\Partners\PartnerApiTokenController;
use App\Http\Controllers\Administrator\Partners\PartnerController;
use App\Http\Controllers\Administrator\StartupController;
use App\Http\Controllers\Administrator\TestimonialController;
use App\Http\Controllers\Administrator\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('administrator')->middleware('throttle:api')->group(function () {
    Route::post('authenticate', [AuthenticationController::class, 'authenticate'])
        ->middleware('throttle:authenticate');

    Route::middleware('auth:administrator')->group(function () {
        Route::get('profile', [AuthenticationController::class, 'showProfile']);
        Route::post('change_password', [AuthenticationController::class, 'changePassword']);
        Route::post('logout', [AuthenticationController::class, 'logout']);

        Route::middleware('ability:roles-view')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['index', 'show']);

            Route::middleware('ability:roles-manage')->group(function () {
                Route::apiResource('roles', RoleController::class)->except(['index', 'show']);
                Route::post('roles/{role}/sync_permissions', [RoleController::class, 'syncPermissions']);
            });
        });

        Route::middleware('ability:permissions-view')->group(function () {
            Route::apiResource('permission_groups', PermissionGroupController::class)->only(['index', 'show']);
            Route::apiResource('permission_groups', PermissionGroupController::class)->except(['index', 'show'])
                ->middleware('ability:permissions-manage');

            Route::apiResource('permissions', PermissionController::class)->only(['index', 'show']);
            Route::apiResource('permissions', PermissionController::class)->except(['index', 'show'])
                ->middleware('ability:permissions-manage');
        });

        Route::middleware('ability:administrators-view')->group(function () {
            Route::apiResource('administrators', AdministratorController::class)->only(['index', 'show']);

            Route::middleware('ability:administrators-manage')->group(function () {
                Route::apiResource('administrators', AdministratorController::class)->except(['index', 'show']);
                Route::post('administrators/{administrator}/sync_roles', [AdministratorController::class, 'syncRoles']);
            });
        });

        Route::middleware('ability:testimonials-view')->group(function () {
            Route::apiResource('testimonials', TestimonialController::class)->only(['index', 'show']);

            Route::apiResource('testimonials', TestimonialController::class)->except(['index', 'show'])
                ->middleware('ability:testimonials-manage');
        });

        Route::middleware('ability:partners-view')->group(function () {
            Route::apiResource('partners', PartnerController::class)->only(['index', 'show']);

            Route::middleware('ability:partners-manage')->group(function () {
                Route::apiResource('partners', PartnerController::class)->except(['index', 'show']);

                Route::get('partners/tokens/scopes', [PartnerApiTokenController::class, 'listScopes']);
                Route::apiResource('partners.tokens', PartnerApiTokenController::class)->only(['index', 'store']);

                Route::scopeBindings()->prefix('partners/{partner}')->group(function () {
                    Route::get('tokens/{token}', [PartnerApiTokenController::class, 'show']);
                    Route::put('tokens/{token}', [PartnerApiTokenController::class, 'update']);
                    Route::delete('tokens/{token}', [PartnerApiTokenController::class, 'destroy']);
                });
            });
        });

        Route::middleware('ability:users-view')->group(function () {
            Route::apiResource('users', UserController::class)->only(['index', 'show']);
        });

        Route::middleware('ability:startups-view')->group(function () {
            Route::get('startups/featured', [FeaturedStartupController::class, 'index']);
            Route::put('startups/featured', [FeaturedStartupController::class, 'update']);

            Route::apiResource('startups', StartupController::class)->only(['index', 'show']);

            Route::middleware('ability:startups-manage')->group(function () {
                Route::post('startups/{startup}/approve', [StartupController::class, 'approve']);
                Route::post('startups/{startup}/return', [StartupController::class, 'returnForResubmision']);
                // Route::post('startups/{startup}/flag', [StartupController::class, 'flag']);
                // Route::post('startups/{startup}/additional_requirements', [StartupController::class, 'additionalRequirements']);
                Route::post('startups/{startup}/publish', [StartupController::class, 'publish']);
            });
        });

        Route::middleware('ability:concerns-view')->group(function () {
            Route::apiResource('concerns', ConcernController::class)->only(['index']);
        });

        Route::middleware('ability:news-view')->group(function () {
            Route::apiResource('news', NewsController::class)->only(['index', 'show']);
            Route::apiResource('news', NewsController::class)->except(['index', 'show'])
                ->middleware('ability:news-manage');
        });

        Route::prefix('dashboard')->group(function () {
            Route::get('statistics', [DashboardController::class, 'getStatistics']);
            Route::get('startups/location_graph', [DashboardController::class, 'locationGraph']);
        });

        Route::prefix('misc')->group(function () {
            Route::middleware('ability:sectors-view')->group(function () {
                Route::apiResource('sectors', SectorController::class)->only(['index', 'show']);
                Route::apiResource('sectors', SectorController::class)->except(['index', 'show'])
                    ->middleware('ability:sectors-manage');
            });

            Route::middleware('ability:requirements-view')->group(function () {
                Route::apiResource('requirements', RequirementController::class)->only(['index', 'show'])->names('admin.v1.requirements');
                Route::apiResource('requirements', RequirementController::class)->except(['index', 'show'])
                    ->middleware('ability:requirements-manage')->names([
                        'store' => 'admin.v1.requirements.store',
                        'update' => 'admin.v1.requirements.update',
                        'destroy' => 'admin.v1.requirements.destroy'
                    ]);
            });

            Route::middleware('ability:remarks-view')->group(function () {
                Route::apiResource('remarks', RemarkController::class)->only(['index', 'show']);
                Route::apiResource('remarks', RemarkController::class)->except(['index', 'show'])
                    ->middleware('ability:remarks-manage');
            });
        });
    });
});
