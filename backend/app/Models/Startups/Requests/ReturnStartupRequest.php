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
            'remarks' => ['nullable'],
            'assessment_tags' => ['array'],
            'assessment_tags.*' => ['required', Rule::exists('assessment_tags', 'code')],
        ];
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
