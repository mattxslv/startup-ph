<?php

namespace App\Models\Misc\Remarks\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateRemarkRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'concern' => ['required', 'min:10'],
            'recommendation' => ['required', 'min:10'],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        return [...parent::validated(), 'is_active' => 1];
    }
}
