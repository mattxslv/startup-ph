<?php

namespace App\Models\Startups\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class StartupAlreadyAssessedException extends Exception
{
    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => 'Startup already assessed.'
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
