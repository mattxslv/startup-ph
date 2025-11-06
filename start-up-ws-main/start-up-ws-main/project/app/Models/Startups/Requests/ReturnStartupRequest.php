<?php

namespace App\Models\Startups\Requests;

use App\Models\Misc\AssessmentTags\AssessmentTag;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReturnStartupRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'remarks' => ['nullable', 'string'],
            'assessment_tags' => ['sometimes', 'array'],
            'assessment_tags.*' => ['string', Rule::exists('assessment_tags', 'code')],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $remarks = $this->input('remarks');
            $assessmentTags = $this->input('assessment_tags', []);
            
            if (empty($remarks) && empty($assessmentTags)) {
                $validator->errors()->add('remarks', 'Either remarks or assessment tags must be provided.');
            }
        });
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        $validated = parent::validated();

        if (request('assessment_tags')) {
            $validated['assessment_tags'] = collect($validated['assessment_tags'])
                ->unique()
                ->map(function ($tag) {
                    $assessmentTag = AssessmentTag::getByCode($tag);
                    return $assessmentTag->only('code', 'description', 'notes', 'meta');
                })
                ->values()
                ->toArray();
        }

        return $validated;
    }
}
