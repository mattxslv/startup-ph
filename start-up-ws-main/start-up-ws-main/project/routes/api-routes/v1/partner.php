<?php

use Illuminate\Support\Facades\Route;

Route::prefix('partner')->middleware(['throttle:api', 'auth.partner:TEST_ACCESS'])->group(function () {
    Route::get(
        '/',
        function () {
            return response()->json(
                [
                    'name' => config('app.name'),
                    'environment' => config('app.env'),
                    'serverTime' => date('Y-m-d H:i:s A'),
                    'timezone' => config('app.timezone')
                ]
            );
        }
    );
});
