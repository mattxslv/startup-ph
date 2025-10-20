<?php

namespace App\Models\Applications\Requests;

use App\Models\Programs\Program;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubmitApplicationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'program_id' => ['required', Rule::exists('programs', 'id')->where('is_published', 1)],
        ];
    }
}
