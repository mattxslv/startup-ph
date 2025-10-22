<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (\Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException $e) {
            throw new NotFoundHttpException($e);
        });

        $this->renderable(function (\Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException $e) {
            throw new AccessDeniedHttpException($e);
        });

        $this->renderable(function (\Illuminate\Auth\AuthenticationException $e) {
            throw new AuthenticationException($e);
        });

        $this->renderable(function (\Illuminate\Contracts\Encryption\DecryptException $e) {
            throw new InvalidEncryptedValueException($e);
        });

        $this->renderable(function (\Illuminate\Support\ItemNotFoundException $e) {
            throw new ModelNotFoundException();
        });

        $this->renderable(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e) {
            if ($e->getPrevious() instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {
                throw new ModelNotFoundException($e->getPrevious());
            }

            throw new NotFoundHttpException($e);
        });

        $this->renderable(function (Throwable $e) {
            if ($e instanceof \Illuminate\Database\QueryException) {
                throw new QueryException($e);
            }

            throw new GeneralException($e);
        });
    }
}
