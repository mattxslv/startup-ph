<?php

namespace App\Models\Users\Requests;

use App\Rules\Turnstile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validator = [
            'email' => ['required'],
            'pin' => ['required'],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->letters()->mixedCase()->numbers()->symbols()
            ],
        ];

        if (config('settings.with_captcha_validation')) {
            $validator['captcha'] = ['required', new Turnstile(config('services.turnstile.secretkey'))];
        }

        return $validator;
    }
}
