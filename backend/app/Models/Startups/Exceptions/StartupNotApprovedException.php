<?php

namespace App\Models\Startups\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class StartupNotApprovedException extends Exception
{
    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => 'Startup not approved.'
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
