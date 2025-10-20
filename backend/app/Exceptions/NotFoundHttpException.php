<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class NotFoundHttpException extends Exception
{
    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => trans('errors.invalid_url'),
        ], Response::HTTP_NOT_FOUND);
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
