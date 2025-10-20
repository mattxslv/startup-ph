<?php

namespace App\Models\Concerns\Requests;

use App\Rules\MobileNumberValidator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateConcernRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', 'email'],
            // 'mobile_no' => ['nullable', new MobileNumberValidator(), Rule::requiredIf(!request('email'))],
            'name' => ['required', 'max:100'],
            'subject' => ['required', 'max:100'],
            'body' => ['required'],
        ];
    }
}
