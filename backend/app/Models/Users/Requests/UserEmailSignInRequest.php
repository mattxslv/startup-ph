<?php

namespace App\Models\Users\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserEmailSignInRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'max:100', 'email'],
        ];
    }
}
