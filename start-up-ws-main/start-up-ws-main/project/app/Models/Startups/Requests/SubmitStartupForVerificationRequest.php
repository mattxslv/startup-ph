<?php

namespace App\Models\Startups\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitStartupForVerificationRequest extends DraftStartupRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            ...parent::rules(),
            'is_oath_accepted' => ['required', 'accepted'],
        ];
    }
}
