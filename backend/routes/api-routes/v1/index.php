<?php

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    require_once 'administrator.php';
    require_once 'user.php';
    require_once 'common.php';
    require_once 'public.php';
});
