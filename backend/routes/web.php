<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get(
    '/',
    function () {
        return response()->json(
            [
                'name' => config('app.name'),
                'environment' => config('app.env'),
                'app_service_name' => config('app.app_service_name'),
                'serverTime' => date('Y-m-d H:i:s'),
                'timezone' => config('app.timezone'),
                'version' => config('app.version'),
            ]
        );
    }
);
