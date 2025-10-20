<?php

namespace App\Models\Testimonials\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'label' => ['required', 'max:100'],
            'photo_url' => ['required', 'max:255'],
            'body' => ['required'],
            'rep_name' => ['required', 'max:100'],
            'rep_position' => ['nullable', 'max:100'],
            'is_active' => ['required', 'boolean']
        ];
    }
}
