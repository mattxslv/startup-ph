<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException as EloquentModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class ModelNotFoundException extends Exception
{
    /**
     * $model
     */
    protected $model = null;

    /**
     * ModelNotFoundException constructor
     *
     * @param EloquentModelNotFoundException|null $exception
     */
    public function __construct(EloquentModelNotFoundException $exception = null)
    {
        if ($exception) {
            try {
                $sections = explode('\\', $exception->getModel());

                $this->model = end($sections);
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
    }

    /**
     * Render
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => trans('errors.data.show', ['model' => $this->model ?? 'Data']),
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
