<?php

namespace App\Models\Startups\Requests;

use App\Models\Misc\Requirements\Requirement;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StartupAdditionalRequirementRequest extends FormRequest
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
            'requirements.*.id' => ['required', Rule::exists('requirements')->where('deleted_at', null)],
        ];
    }

    /**
     * @inheritDoc
     */
    public function validated($key = null, $default = null)
    {
        return collect(request('requirements'))->unique('id')
            ->map(function ($req) {
                $requirement = Requirement::find($req['id']);

                return [
                    'id' => $requirement->id,
                    'label' => $requirement->label,
                    'notes' => $requirement->notes,
                    'attachments' => [],
                ];
            })->toArray();
    }
}
