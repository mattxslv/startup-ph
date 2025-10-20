<?php

namespace App\Models\Testimonials\Requests;

use App\Enums\Common;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class CreateTestimonialRequest extends FormRequest
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
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        return [...parent::validated(), 'is_active' => 1];
    }
}
