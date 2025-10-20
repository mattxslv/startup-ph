<?php

namespace App\Models\Misc\Requirements\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequirementRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => ['required', 'max:100', Rule::unique('requirements')->ignore($this->requirement)],
            'name' => ['required', 'max:255'],
            'type' => ['required', 'max:100'],
            'meta' => ['required', 'array'],
        ];
    }
}
