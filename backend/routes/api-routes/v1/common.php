<?php

use App\Http\Controllers\Common\BarangayController;
use App\Http\Controllers\Common\CountryController;
use App\Http\Controllers\Common\MunicipalityController;
use App\Http\Controllers\Common\ProvinceController;
use App\Http\Controllers\Common\RegionController;
use App\Http\Controllers\Common\RemarkController;
use App\Http\Controllers\Common\RequirementController;
use App\Http\Controllers\Common\SectorController;
use Illuminate\Support\Facades\Route;

Route::prefix('common')->group(function () {
    Route::get('requirements', RequirementController::class);
    Route::get('remarks', RemarkController::class);
    Route::get('countries', CountryController::class);
    Route::get('regions', RegionController::class);
    Route::get('provinces', ProvinceController::class);
    Route::get('municipalities', MunicipalityController::class);
    Route::get('barangays', BarangayController::class);

    Route::get('sectors', SectorController::class);
});
