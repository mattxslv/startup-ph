<?php

use App\Http\Controllers\Public\ContactUsController;
use App\Http\Controllers\Public\FeaturedStartupController;
use App\Http\Controllers\Public\NewsController;
use App\Http\Controllers\Public\StartupController;
use App\Http\Controllers\Public\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::prefix('public')->middleware('throttle:api')->group(function () {
    Route::get('startups/featured', FeaturedStartupController::class);
    Route::get('startups', [StartupController::class, 'index']);
    Route::get('startups/{slug}', [StartupController::class, 'show']);

    Route::get('testimonials', TestimonialController::class);
    Route::get('news', [NewsController::class, 'index']);
    Route::get('news/{news}', [NewsController::class, 'show']);

    Route::post('contact_us', ContactUsController::class);
});
