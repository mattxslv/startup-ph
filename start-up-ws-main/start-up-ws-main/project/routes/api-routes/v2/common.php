<?php

use App\Http\Controllers\Common\AssessmentTagController;
use App\Http\Controllers\Common\BarangayController;
use App\Http\Controllers\Common\CountryController;
use App\Http\Controllers\Common\DatasetController;
use App\Http\Controllers\Common\MunicipalityController;
use App\Http\Controllers\Common\ProgramController;
use App\Http\Controllers\Common\ProvinceController;
use App\Http\Controllers\Common\RegionController;
use App\Http\Controllers\Common\SectorController;
use App\Http\Controllers\Common\UploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('common')->group(function () {
    Route::get('countries', CountryController::class);
    Route::get('regions', RegionController::class);
    Route::get('provinces', ProvinceController::class);
    Route::get('municipalities', MunicipalityController::class);
    Route::get('barangays', BarangayController::class);

    Route::get('datasets', DatasetController::class);
    Route::get('assessment_tags', AssessmentTagController::class);
    Route::get('sectors', SectorController::class);

    Route::apiResource('programs', ProgramController::class)->only('index', 'show');
});

// Upload endpoints (can be accessed without common prefix for flexibility)
Route::prefix('upload')->group(function () {
    Route::post('generate-signed-url', [UploadController::class, 'generateSignedUrl']);
    Route::post('/', [UploadController::class, 'upload']);
    Route::post('/ext/{project}/upload', [UploadController::class, 'upload']); // Support legacy endpoint
});
