<?php

namespace Dmn\PhAddress\Validators;

use Dmn\PhAddress\Models\Barangay;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Validator;

class ValidBarangay extends AbstractValidator
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
        $municipalityCode = $this->getDependencyCode($parameters);

        $barangay = $this->getBarangay($value);

        if (is_null($barangay) == true) {
            return false;
        }

        if (is_null($municipalityCode) == false) {
            if ($barangay->municipality_code != $municipalityCode) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get Barangay
     *
     * @param string|null $code
     *
     * @return Barangay|null
     */
    protected function getBarangay($code)
    {
        return Cache::remember(
            'barangay-' . $code,
            86400,
            function () use ($code) {
                return Barangay::whereCode($code)->first();
            }
        );
    }
}
