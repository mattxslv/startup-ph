<?php

namespace App\Models\Users\Requests;

use App\Enums\Common;
use App\Models\Users\User;
use App\Rules\MobileNumberValidator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'mobile_no' => [
                'required',
                // Rule::unique('users')->ignore(User::authenticated()),
                new MobileNumberValidator(),
            ],
            'first_name' => ['required', 'max:100'],
            'middle_name' => ['nullable', 'max:100'],
            'last_name' => ['required', 'max:100'],
            'suffix_name' => ['nullable', 'max:20', Rule::in(Common::SUFFIX_NAMES)],
            'birth_date' => ['required', 'date'],
            'birth_place' => ['required', 'max:100'],
            'gender' => ['required', Rule::in(Common::GENDERS)],
            'photo_url' => ['required', 'url', 'max:255'],
            'identification_type' => ['required', 'max:50'],
            'identification_no' => ['required', 'max:100'],
            'identification_url' => ['required', 'url', 'max:255'],
            // 'profile_type' => ['required', 'max:20', Rule::in(Common::PROFILE_TYPES)],
            'citizenship' => ['required', 'max:100'],
            'social_classification' => ['required', 'max:100'],
            // 'region_code' => ['nullable', Rule::exists('regions', 'code')],
            // 'province_code' => ['nullable', Rule::exists('provinces', 'code')],
            // 'municipality_code' => ['nullable', Rule::exists('municipalities', 'code')],
            // 'barangay_code' => ['nullable', Rule::exists('barangays', 'code')],
            // 'street' => ['nullable', 'max:200'],
            // 'postal_code' => ['nullable', 'numeric', 'digits:4'],
            // 'address_geoloc' => ['nullable', 'max:100'],
            'interests' => ['required', 'array'],
            'interests.*' => ['required']
        ];

        return collect($rules)->only(request()->keys())->toArray();
    }
}
