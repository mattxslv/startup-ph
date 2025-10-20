<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CustomException extends Exception
{
    /**
     * Error
     *
     * @var string
     */
    protected string $error = 'custom_exception';

    /**
     * Error message
     *
     * @var string
     */
    protected string $errorMessage = 'errors.unknown';

    /**
     * Status code
     *
     * @var int
     */
    protected int $statusCode = Response::HTTP_BAD_REQUEST;

    /**
     * Description
     *
     * @var string|null
     */
    protected ?string $description = null;

    /**
     * Meta
     *
     * @var array|null
     */
    protected ?array $meta = null;

    /**
     * Report
     *
     * @var boolean
     */
    protected bool $report = false;

    /**
     * CustomException constructor
     *
     * @param Exception $e
     */
    public function __construct(Exception $e = null)
    {
        $errorMessage = trans($this->errorMessage);

        if ($e && $e->getMessage()) {
            $errorMessage = $e->getMessage();
        }

        parent::__construct($errorMessage);
    }

    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        $errorData = [
            'error' => $this->error,
            'message' => trans($this->errorMessage),
            'error_description' => trans($this->description ?? $this->errorMessage),
        ];

        if ($this->meta) {
            $errorData['meta'] = $this->meta;
        }

        return response()->json($errorData, $this->statusCode);
    }

    /**
     * Report
     *
     * @return void
     */
    public function report()
    {
        if ($this->report) {
            Log::error($this->getMessage(), ['exception' => $this]);
        }
    }
}
