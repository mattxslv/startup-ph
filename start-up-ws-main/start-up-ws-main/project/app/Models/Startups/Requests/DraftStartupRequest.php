<?php

namespace App\Models\Startups\Requests;

use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Startup;
use App\Models\Users\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class DraftStartupRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // if (request('name')) {
        //     request()->merge(['slug' => \Str::slug(request('name'))]);
        // }

        $rules = [
            'logo_url' => ['required', 'url', 'max:255'],
            'name' => ['required', 'max:100'],
            // 'slug' => ['required', 'max:100', Rule::unique('startups', 'slug')->ignore(User::authenticated()->startup)],
            // 'address_label' => ['nullable', 'max:255'],
            // 'address_geoloc' => ['required', 'max:100'],
            'region_code' => ['required', function($attribute, $value, $fail) {
                // Check if it's a valid 2-digit code (legacy format)
                if (preg_match('/^\d{2}$/', $value)) {
                    $fullCode = $value . '0000000';
                    if (!\DB::table('regions')->where('code', $fullCode)->exists()) {
                        $fail('The selected region code is invalid.');
                    }
                } 
                // Check if it's a valid 9-digit code (new format)
                elseif (preg_match('/^\d{9}$/', $value)) {
                    if (!\DB::table('regions')->where('code', $value)->exists()) {
                        $fail('The selected region code is invalid.');
                    }
                } else {
                    $fail('The selected region code is invalid.');
                }
            }],
            'province_code' => ['required', Rule::exists('provinces', 'code')],
            'municipality_code' => ['required', Rule::exists('municipalities', 'code')],
            'barangay_code' => ['required', Rule::exists('barangays', 'code')],
            'street' => ['nullable', 'max:200'],
            'street_two' => ['nullable', 'max:200'],
            'postal_code' => ['nullable', 'numeric', 'digits:4'],
            'description' => ['required'],
            'short_description' => ['nullable', 'max:255'],
            'social_website_url' => ['nullable', 'url', 'max:255'],
            'social_instagram_url' => ['nullable', 'url', 'max:255'],
            'social_facebook_url' => ['nullable', 'url', 'max:255'],
            'social_linkedin_url' => ['nullable', 'url', 'max:255'],
            'content' => ['required', 'array'],
            'development_phase' => ['required', 'max:100'],
            'founder_name' => ['required', 'max:100'],
            'founding_year' => ['nullable', 'max:4', 'date_format:Y', 'gte:1900', 'lte:' . date('Y')],
            'business_classification' => ['required', 'max:100'],
            'business_name' => ['nullable', 'max:100'],
            'tin' => ['nullable', 'max:100', Rule::unique('startups', 'tin')->ignore(User::authenticated()->startup)],
            'registration_no' => ['nullable', 'max:100'],
            'dti_permit_number' => ['nullable', 'max:100', 'required_without:sec_permit_number'],
            'sec_permit_number' => ['nullable', 'max:100', 'required_without:dti_permit_number'],
            'proof_of_registration_url' => ['nullable', 'url', 'max:255'],
            'business_certificate_expiration_date' => ['nullable', 'date'],
            'business_mobile_no' => ['nullable', 'max:100'],
            // Sectors attributes
            'sectors' => ['nullable', 'array'],
            'sectors.*' => ['required'],

            'has_funding' => ['required', 'boolean'],
            // 'fundings' => ['nullable', 'array', Rule::requiredIf(request('has_funding'))],

            // 'application_type' => ['required', Rule::in(StartupEnum::APPLICATION_TYPES)],
            // 'founder' => ['nullable', 'max:100'],
            // 'organization' => ['nullable', 'max:100'],
            // 'tin' => ['nullable', 'max:100', Rule::unique('startups', 'tin')->ignore($this->startup)],
            // 'contact_no' => ['nullable', 'max:100'],
            // 'short_description' => ['required', 'max:255'],
            // 'photo_url' => ['nullable', 'url', 'max:255'],
            // 'presentation_url' => ['nullable', 'url', 'max:255'],
            // 'video_url' => ['nullable', 'url', 'max:255'],
            // 'icon_url' => ['nullable', 'url', 'max:255'],

            // 'address_geoloc' => ['nullable', 'max:100'],
            // 'address_label' => ['nullable', 'max:255'],
            // 'classification' => ['nullable', 'max:100'],
            // 'business_name' => ['nullable', 'max:100'],
            // 'business_no' => ['nullable', 'max:100'],
            // 'business_type' => ['nullable', 'max:100'],
            // 'requirements' => ['nullable', 'array'],
        ];
        // return $rules;
        $selectedRules = collect($rules)->only(request()->keys())->toArray();

        if (request('has_funding')) {
            $selectedRules = [
                ...$selectedRules,
                'fundings' => ['required', 'array'],
                'fundings.*.agency' => ['required'],
                'fundings.*.document_urls' => ['required', 'array'],
                'fundings.*.document_urls.*' => ['required', 'url'],
            ];
        }

        return $selectedRules;
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        $validated = parent::validated();

        if (request('name')) {
            $origSlug = \Str::slug(request('name'));
            $slug = $origSlug;
            $incrementals = 1;

            while ($startup = Startup::query()->where('slug', $slug)->where('id', '<>', User::authenticated()->startup->id ?? null)->first()) {
                $slug = $origSlug . '-' . strval($incrementals);

                $incrementals++;
            }

            $validated['slug'] = $slug;
        }

        if (request()->has('has_funding')) {
            if (!request('has_funding')) {
                $validated['fundings'] = [];
            }
        }

        return $validated;
    }
}
