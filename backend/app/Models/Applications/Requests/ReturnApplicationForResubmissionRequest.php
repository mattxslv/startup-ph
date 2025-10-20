<?php

namespace App\Models\Applications\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReturnApplicationForResubmissionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'remarks' => ['required'],
        ];
    }
}
