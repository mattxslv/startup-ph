<?php

namespace App\Exceptions;

use Illuminate\Http\Response;

class SecondaryAuthenticationException extends CustomException
{
    public function __construct(array $meta)
    {
        $this->meta = $meta;
    }

    protected string $error = 'secondary_authentication';

    protected string $errorMessage = 'Secondary validation necessary.';

    protected int $statusCode = Response::HTTP_BAD_REQUEST;
}
