<?php

namespace App\Models\Applications\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ProgramNotOpenForApplicationException extends Exception
{
    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => 'Program not open for application.'
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
