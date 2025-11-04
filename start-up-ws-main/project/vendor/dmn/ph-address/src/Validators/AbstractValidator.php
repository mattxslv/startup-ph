<?php

namespace Dmn\PhAddress\Validators;

use Illuminate\Http\Request;

abstract class AbstractValidator
{
    protected $request;

    /**
     * Construct
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Get dependency Code
     *
     * @param array $parameters
     *
     * @return string|null
     */
    protected function getDependencyCode(array $parameters)
    {
        $code = $parameters[0] ?? null;

        if (is_null($code) == true) {
            return $code;
        }

        if ($this->request->has($code)) {
            return $this->request->get($code);
        }

        return $code;
    }
}
