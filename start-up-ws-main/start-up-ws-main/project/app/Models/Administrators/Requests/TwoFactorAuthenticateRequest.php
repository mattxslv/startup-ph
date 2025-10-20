<?php

namespace App\Models\Administrators\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TwoFactorAuthenticateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'auth_token' => ['required'],
            'pin' => ['required'],
        ];
    }
}
