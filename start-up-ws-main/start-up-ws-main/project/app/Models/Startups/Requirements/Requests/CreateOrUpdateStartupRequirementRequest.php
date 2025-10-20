<?php

namespace App\Models\Startups\Requirements\Requests;

use App\Models\Misc\Requirements\Requirement;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateOrUpdateStartupRequirementRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'requirement_id' => ['required', Rule::exists('requirements', 'id')->where('deleted_at', null)],
            'value' => ['required'],
        ];
    }

     /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        $requirement = Requirement::findOrFail(request('requirement_id'));

        return [
            ...parent::validated(),
            'requirement_code' => $requirement->code,
            'requirement_name' => $requirement->name,
        ];
    }
}