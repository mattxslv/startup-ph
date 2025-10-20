<?php

namespace App\Models\Misc\Sectors\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSectorRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required',
                'max:100',
                Rule::unique('sectors')->where('deleted_at', null)->ignore($this->sector)
            ],
            'is_active' => ['required', 'boolean']
        ];
    }
}
