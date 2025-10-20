<?php

namespace App\Models\Misc\Datasets\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDatasetRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => [
                'required',
                'max:100',
                // Rule::unique('datasets')->ignore($this->dataset)
            ],
            'value' => ['required', 'array']
        ];
    }
}
