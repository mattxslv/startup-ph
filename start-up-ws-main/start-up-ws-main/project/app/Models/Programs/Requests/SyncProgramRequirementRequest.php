<?php

namespace App\Models\Programs\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SyncProgramRequirementRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'requirements' => ['required', 'array'],
            'requirements.*.requirement_id' => [
                'required',
                Rule::exists('requirements', 'id')->where('deleted_at', null)
            ],
            'requirements.*.is_required' => ['nullable', 'boolean'],
        ];
    }
}
