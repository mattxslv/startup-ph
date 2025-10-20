<?php

namespace App\Models\Users\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class IncompleteProfileException extends Exception
{
    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => 'Your profile is incomplete.'
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Report
     *
     * @return void
     */
    public function report(): void
    {
        //
    }
}
