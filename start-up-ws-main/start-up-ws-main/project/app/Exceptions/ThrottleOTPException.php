<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ThrottleOTPException extends Exception
{
    /**
     * @var int
     */
    protected $seconds;

    public function __construct(int $seconds)
    {
        $this->seconds = $seconds;
    }

    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => trans('errors.otp.throttle', ['seconds' => $this->seconds])
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
