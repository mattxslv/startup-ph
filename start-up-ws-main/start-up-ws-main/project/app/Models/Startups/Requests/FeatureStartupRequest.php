<?php

namespace App\Models\Startups\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FeatureStartupRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'startups' => ['required', 'array'],
            'startups.*' => ['required', Rule::exists('startups', 'id')->whereNot('verified_at', null)],
        ];
    }

    /**
     * @inheritDoc
     */
    public function attributes()
    {
        return [
            'startups.*' => 'startup',
        ];
    }
}
