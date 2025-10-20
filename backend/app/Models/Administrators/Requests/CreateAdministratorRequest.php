<?php

namespace App\Models\Administrators\Requests;

use App\Enums\Common;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class CreateAdministratorRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'agency' => ['required', 'max:50'],
            'email' => ['required', 'email', 'unique:administrators,email,NULL,id'],
            'contact_number' => ['nullable', 'max:50'],
            'first_name' => ['required', 'max:100'],
            'middle_name' => ['nullable', 'max:100'],
            'last_name' => ['required', 'max:100'],
            'suffix_name' => ['nullable', Rule::in(Common::SUFFIX_NAMES)],
            'photo_url' => ['nullable', 'url'],
            // 'password' => ['required', 'confirmed', Password::min(8)]
        ];
    }
}
