<?php

namespace App\Models\Resources\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateResourceRequest extends FormRequest
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
            'title' => ['required', 'max:100'],
            'sub_title' => ['required', 'max:255'],
            'publish_date' => ['nullable', 'date'],
            'publish_by' => ['required', 'max:255'],
            'thumbnail_url' => ['nullable', 'max:255'],
            'body' => ['nullable', 'array'],
            'tags' => ['nullable', 'array'],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        return [
            ...parent::validated(),
            'publish_date' => request('publish_date') ?? date('Y-m-d'),
        ];
    }
}
