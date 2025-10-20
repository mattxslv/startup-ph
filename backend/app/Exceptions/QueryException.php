<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class QueryException extends Exception
{
    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => trans('errors.data.process'),
        ], Response::HTTP_BAD_REQUEST);
    }
}
