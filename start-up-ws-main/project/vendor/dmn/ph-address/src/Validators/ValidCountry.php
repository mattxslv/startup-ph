<?php

namespace Dmn\PhAddress\Validators;

use Dmn\PhAddress\Models\Country;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Validator;

class ValidCountry
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
        $country = $this->getCountry($value);

        if (is_null($country) == true) {
            return false;
        }

        return true;
    }

    /**
     * Get Country
     *
     * @param string|null $code
     *
     * @return Country|null
     */
    protected function getCountry($code)
    {
        return Cache::remember(
            'country-' . $code,
            86400,
            function () use ($code) {
                return Country::whereCode($code)->first();
            }
        );
    }
}
