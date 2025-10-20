<?php

namespace App\Models\Startups\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlagStartupRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'flag' => ['required', 'array'],
            'flag.*.concern' => ['nullable'],
            'flag.*.recommendation' => ['nullable'],
            'flag.*.remarks' => ['nullable'],
        ];
    }
}
