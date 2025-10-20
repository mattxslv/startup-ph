<?php

namespace App\Models\Misc\Remarks\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRemarkRequest extends FormRequest
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
            'is_active' => ['required', 'boolean']
        ];
    }
}
