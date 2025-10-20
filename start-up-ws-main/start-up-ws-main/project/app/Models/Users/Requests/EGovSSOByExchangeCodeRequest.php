<?php

namespace App\Models\Users\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EGovSSOByExchangeCodeRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'exchange_code' => ['required'],
        ];
    }
}
