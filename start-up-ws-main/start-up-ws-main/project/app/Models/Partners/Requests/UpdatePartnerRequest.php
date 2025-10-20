<?php

namespace App\Models\Partners\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePartnerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'code' => ['required', 'min:3', 'max:20', Rule::unique('partners', 'code')->ignore($this->partner)],
            'name' => ['required', 'max:100'],
            'photo_url' => ['required', 'url'],
        ];
    }
}
