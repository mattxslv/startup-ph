<?php

namespace App\Models\Administrators\Requests;

use App\Rules\Turnstile;
use Illuminate\Foundation\Http\FormRequest;

class AuthenticateAdministratorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validator = [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ];

        if (config('settings.with_captcha_validation')) {
            $validator['captcha'] = ['required', new Turnstile(config('services.turnstile.secretkey'))];
        }

        return $validator;
    }
}
