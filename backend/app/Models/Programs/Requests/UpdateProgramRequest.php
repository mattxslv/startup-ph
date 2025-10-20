<?php

namespace App\Models\Programs\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProgramRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'agency' => ['required', 'max:50'],
            'name' => ['required', 'max:100'],
            'thumbnail_url' => ['nullable', 'url', 'max:255'],
            'banner_url' => ['nullable', 'url', 'max:255'],
            'type' => ['required', 'max:100'],
            'date_start' => ['nullable', 'date'],
            'date_end' => ['nullable', 'date', 'after_or_equal:date_start'],
            'description' => ['required'],
            'content' => ['nullable', 'array'],
            'is_verified_required' => ['nullable', 'boolean'],
        ];
    }
}
