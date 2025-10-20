<?php

use App\Http\Controllers\Common\AssessmentTagController;
use App\Http\Controllers\Common\BarangayController;
use App\Http\Controllers\Common\CountryController;
use App\Http\Controllers\Common\DatasetController;
use App\Http\Controllers\Common\MunicipalityController;
use App\Http\Controllers\Common\ProgramController;
use App\Http\Controllers\Common\ProvinceController;
use App\Http\Controllers\Common\RegionController;
use Illuminate\Support\Facades\Route;

Route::prefix('common')->group(function () {
    Route::get('countries', CountryController::class);
    Route::get('regions', RegionController::class);
    Route::get('provinces', ProvinceController::class);
    Route::get('municipalities', MunicipalityController::class);
    Route::get('barangays', BarangayController::class);

    Route::get('datasets', DatasetController::class);
    Route::get('assessment_tags', AssessmentTagController::class);

    Route::apiResource('programs', ProgramController::class)->only('index', 'show');
});
