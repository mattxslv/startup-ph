<?php

namespace Dmn\PhAddress\Validators;

use Dmn\PhAddress\Models\Municipality;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Validator;

class ValidMunicipality extends AbstractValidator
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
        $provinceCode = $this->getDependencyCode($parameters);

        $municipality = $this->getMunicipality($value);

        if (is_null($municipality) == true) {
            return false;
        }

        if (is_null($provinceCode) == false) {
            if ($municipality->province_code != $provinceCode) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get Municipality
     *
     * @param string|null $code
     *
     * @return Municipality|null
     */
    protected function getMunicipality($code)
    {
        return Cache::remember(
            'municipality-' . $code,
            86400,
            function () use ($code) {
                return Municipality::whereCode($code)->first();
            }
        );
    }
}
