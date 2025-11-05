<?php

use App\Http\Controllers\ChatbotController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
|
| These routes are publicly accessible and do not require authentication
| or CSRF protection. They bypass Sanctum's stateful middleware.
|
*/

Route::post('v2/user/chatbot', [ChatbotController::class, 'chat']);
