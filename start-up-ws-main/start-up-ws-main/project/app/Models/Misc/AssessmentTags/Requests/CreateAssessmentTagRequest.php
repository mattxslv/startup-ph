<?php

namespace App\Models\Misc\AssessmentTags\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateAssessmentTagRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => ['required', 'max:50', Rule::unique('assessment_tags')],
            'description' => ['required', 'max:255'],
            'notes' => ['nullable', 'max:255'],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        return [...parent::validated(), 'is_active' => 1];
    }
}
