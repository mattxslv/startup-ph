<?php

namespace Dmn\PhAddress\Validators;

use Dmn\PhAddress\Models\Province;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Validator;

class ValidProvince extends AbstractValidator
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
        $regionCode = $this->getDependencyCode($parameters);

        $province = $this->getProvince($value);

        if (is_null($province) == true) {
            return false;
        }

        if (is_null($regionCode) == false) {
            if ($province->region_code != $regionCode) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get Province
     *
     * @param string|null $code
     *
     * @return Province|null
     */
    protected function getProvince($code)
    {
        return Cache::remember(
            'province-' . $code,
            86400,
            function () use ($code) {
                return Province::whereCode($code)->first();
            }
        );
    }
}
