<?php

use App\Http\Controllers\Public\ContactUsController;
use App\Http\Controllers\Public\NewsController;
use App\Http\Controllers\Public\ResourceController;
use App\Http\Controllers\Public\StartupController;
use Illuminate\Support\Facades\Route;

Route::prefix('public')->middleware('throttle:api')->group(function () {
    Route::apiResource('startups', StartupController::class)->only('index', 'show');

    Route::apiResource('news', NewsController::class)->only('index', 'show');

    Route::apiResource('resources', ResourceController::class)->only('index', 'show');

    Route::post('contact_us', ContactUsController::class);
});
