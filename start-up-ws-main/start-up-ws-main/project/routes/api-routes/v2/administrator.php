<?php

use App\Http\Controllers\Administrator\Access\PermissionController;
use App\Http\Controllers\Administrator\Access\PermissionGroupController;
use App\Http\Controllers\Administrator\Access\RoleController;
use App\Http\Controllers\Administrator\AdministratorController;
use App\Http\Controllers\Administrator\AuditController;
use App\Http\Controllers\Administrator\AuthenticationController;
use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\Misc\AssessmentTagController;
use App\Http\Controllers\Administrator\Misc\DatasetController;
use App\Http\Controllers\Administrator\Misc\RequirementController;
use App\Http\Controllers\Administrator\NewsController;
use App\Http\Controllers\Administrator\Programs\ApplicationController;
use App\Http\Controllers\Administrator\Programs\ProgramController;
use App\Http\Controllers\Administrator\ResourcesController;
use App\Http\Controllers\Administrator\StartupController;
use Illuminate\Support\Facades\Route;

Route::prefix('administrator')->middleware('throttle:api')->group(function () {
    Route::post('authenticate', [AuthenticationController::class, 'authenticate']);
    Route::post('two_factor_authenticate', [AuthenticationController::class, 'twoFactorAuthenticate'])
        ->middleware('throttle:authenticate');

    Route::middleware(['auth:administrator', 'refresh.token', 'regional.focal'])->group(function () {
        Route::get('profile', [AuthenticationController::class, 'showProfile']);
        Route::post('change_password', [AuthenticationController::class, 'changePassword']);
        Route::post('logout', [AuthenticationController::class, 'logout']);

        Route::middleware('ability:roles-view')->group(function () {
            Route::apiResource('roles', RoleController::class)->only(['index', 'show']);

            Route::middleware('ability:roles-manage')->group(function () {
                Route::apiResource('roles', RoleController::class)->except(['index', 'show', 'destroy']);
                Route::post('roles/{role}/sync_permissions', [RoleController::class, 'syncPermissions']);
            });
        });

        Route::middleware('ability:roles-manage')->group(function () {
            Route::apiResource('permission_groups', PermissionGroupController::class)->only(['index']);

            Route::apiResource('permissions', PermissionController::class)->only(['index', 'show']);
        });

        Route::middleware('ability:administrators-view')->group(function () {
            Route::apiResource('administrators', AdministratorController::class)->only(['index', 'show']);

            Route::middleware('ability:administrators-manage')->group(function () {
                Route::apiResource('administrators', AdministratorController::class)->except(['index', 'show', 'destroy']);
                Route::put('administrators/{administrator}/update_password', [AdministratorController::class, 'updatePassword']);
                Route::put('administrators/{administrator}/reset_password', [AdministratorController::class, 'resetPassword']);
                Route::post('administrators/{administrator}/sync_roles', [AdministratorController::class, 'syncRoles']);
            });
        });

        Route::prefix('misc')->group(function () {
            Route::middleware('ability:datasets-view')->group(function () {
                Route::apiResource('datasets', DatasetController::class)->only(['index', 'show']);
                Route::apiResource('datasets', DatasetController::class)->except(['index', 'show'])
                    ->middleware('ability:datasets-manage');
            });

            Route::middleware('ability:requirements-view')->group(function () {
                Route::apiResource('requirements', RequirementController::class)->only(['index', 'show'])->names('admin.requirements');
                Route::apiResource('requirements', RequirementController::class)->except(['index', 'show'])
                    ->middleware('ability:requirements-manage')->names([
                        'store' => 'admin.requirements.store',
                        'update' => 'admin.requirements.update',
                        'destroy' => 'admin.requirements.destroy'
                    ]);
            });

            Route::middleware('ability:news-view')->group(function () {
                Route::apiResource('news', NewsController::class)->only(['index', 'show']);

                Route::middleware('ability:news-manage')->group(function () {
                    Route::apiResource('news', NewsController::class)->except(['index', 'show']);

                    Route::post('news/{news}/toggle_published_status', [NewsController::class, 'togglePublishedStatus']);
                });
            });

            Route::middleware('ability:resources-view')->group(function () {
                Route::apiResource('resources', ResourcesController::class)->only(['index', 'show']);

                Route::middleware('ability:resources-manage')->group(function () {
                    Route::apiResource('resources', ResourcesController::class)->except(['index', 'show']);

                    Route::post('resources/{resource}/toggle_published_status', [ResourcesController::class, 'togglePublishedStatus']);
                });
            });

            Route::middleware('ability:assessment-tags-view')->group(function () {
                Route::apiResource('assessment_tags', AssessmentTagController::class)->only(['index', 'show']);
                Route::apiResource('assessment_tags', AssessmentTagController::class)->except(['index', 'show', 'destroy'])
                    ->middleware('ability:assessment-tags-manage');
            });
        });

        Route::middleware('ability:startups-view')->group(function () {
            Route::apiResource('startups', StartupController::class)->only(['index', 'show']);

            Route::post('startups/{startup}/verify', [StartupController::class, 'verify'])
                ->middleware('ability:startups-verify');

            Route::post('startups/{startup}/return', [StartupController::class, 'returnForResubmision'])
                ->middleware('ability:startups-return');

            Route::patch('startups/{startup}/flag-test-account', [StartupController::class, 'flagTestAccount'])
                ->middleware('ability:startups-manage');

            Route::delete('startups/bulk-delete-test-accounts', [StartupController::class, 'bulkDeleteTestAccounts'])
                ->middleware('ability:startups-manage');

            Route::get('startups/{startup}/applications', [StartupController::class, 'applications']);
        });

        Route::middleware('ability:programs-view')->group(function () {
            Route::apiResource('programs', ProgramController::class)->only(['index', 'show']);

            Route::middleware('ability:programs-manage')->group(function () {
                Route::apiResource('programs', ProgramController::class)->except(['index', 'show']);
                Route::post('programs/{program}/sync_requirements', [ProgramController::class, 'syncRequirements']);
                Route::post('programs/{program}/toggle_publish', [ProgramController::class, 'togglePublish']);
            });
        });

        Route::middleware('ability:applications-view')->group(function () {
            Route::apiResource('applications', ApplicationController::class)->only(['index', 'show'])->names('admin.applications');

            Route::post('applications/{application}/approve', [ApplicationController::class, 'approve'])
                ->middleware('ability:applications-approve');

            Route::post('applications/{application}/reject', [ApplicationController::class, 'reject'])
                ->middleware('ability:applications-reject');

            Route::post('applications/{application}/return', [ApplicationController::class, 'returnForResubmission'])
                ->middleware('ability:applications-return');
        });

        Route::prefix('dashboard')->group(function () {
            Route::get('statistics', [DashboardController::class, 'getStatictics']);
            Route::get('comprehensive-statistics', [DashboardController::class, 'comprehensiveStatistics']);
            Route::get('startup_count', [DashboardController::class, 'getStartupCount']);
            Route::get('startup_by_address_code', [DashboardController::class, 'startupByAddressCode']);
            Route::get('startup_by_regions', [DashboardController::class, 'startupByRegions']);
            Route::get('startup_by_status', [DashboardController::class, 'startupByStatus']);
            Route::get('startup_by_assessment_tags', [DashboardController::class, 'startupByAssessmentTags']);
            Route::get('expiring_permits', [DashboardController::class, 'expiringPermits']);
            // Route::get('startup_by_address_geoloc', [DashboardController::class, 'startupByAddressGeoloc']);
        });

        Route::prefix('export')->middleware('ability:startups-view')->group(function () {
            Route::get('startups/csv', [\App\Http\Controllers\Administrator\ExportController::class, 'exportStartupsCSV']);
            Route::get('statistics/csv', [\App\Http\Controllers\Administrator\ExportController::class, 'exportStatisticsCSV']);
            Route::get('report/pdf', [\App\Http\Controllers\Administrator\ExportController::class, 'generatePDFReport']);
        });

        Route::get('audits', AuditController::class)->middleware('ability:audits-view');
    });
});
