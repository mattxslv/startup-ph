<?php

namespace App\Models\Users\Requests;

use App\Rules\Turnstile;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        $validator = [
            'email' => [
                'required',
                'max:100',
                'email',
                // Rule::unique('users')
            ],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->letters()->mixedCase()->numbers()->symbols()
            ],
            'pin' => ['required'],
        ];

        if (config('settings.with_captcha_validation')) {
            $validator['captcha'] = ['required', new Turnstile(config('services.turnstile.secretkey'))];
        }

        return $validator;
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        $data = parent::validated();

        $data['password'] = bcrypt($data['password']);
        $data['registered_at'] = date('Y-m-d H:i:s');
        $data['email_verified_at'] = now();

        return $data;
    }
}
