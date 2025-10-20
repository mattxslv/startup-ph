<?php

namespace App\Models\Misc\AssessmentTags\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAssessmentTagRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => ['required', 'max:50', Rule::unique('assessment_tags')->ignore($this->assessment_tag)],
            'description' => ['required', 'max:255'],
            'notes' => ['nullable', 'max:255'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
