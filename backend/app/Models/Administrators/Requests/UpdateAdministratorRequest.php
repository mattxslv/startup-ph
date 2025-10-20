<?php

namespace App\Models\Administrators\Requests;

use App\Enums\Common;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateAdministratorRequest extends FormRequest
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
            'email' => [
                'required',
                'email',
                Rule::unique('administrators', 'email')->ignore($this->administrator->id)
            ],
            'contact_number' => ['nullable', 'max:50'],
            'first_name' => ['required', 'max:100'],
            'middle_name' => ['nullable', 'max:100'],
            'last_name' => ['required', 'max:100'],
            'suffix_name' => ['nullable', Rule::in(Common::SUFFIX_NAMES)],
            'photo_url' => ['nullable', 'url'],
            // 'password' => ['required', 'confirmed', Password::min(8)]
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        $data = parent::validated();

        // $data['password'] = bcrypt($data['password']);

        return $data;
    }
}
