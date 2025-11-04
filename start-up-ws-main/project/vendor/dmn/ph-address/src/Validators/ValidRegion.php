<?php

namespace Dmn\PhAddress\Validators;

use Dmn\PhAddress\Models\Region;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Validator;

class ValidRegion
{
    /**
     * Validate payload
     *
     * @param string $attribute
     * @param string $value
     * @param array $parameters
     * @param Validator $validator
     *
     * @return boolean
     */
    public function validate(
        string $attribute,
        string $value,
        array $parameters,
        Validator $validator
    ): bool {
        $region = Cache::remember(
            'region-' . $value,
            86400,
            function () use ($value) {
                return Region::whereCode($value)->first();
            }
        );

        if (is_null($region) == true) {
            return false;
        }

        return true;
    }
}
