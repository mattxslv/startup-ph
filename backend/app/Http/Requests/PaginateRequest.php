<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PaginateRequest extends FormRequest
{
    /**
     * @var array $orderByValidator
     */
    private $orderByValidator;

    public function __construct(array $orderByValidator = ['id'])
    {
        $this->orderByValidator = [
            'id',
            'created_at',
            'updated_at',
            ...$orderByValidator
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'order_by' => ['nullable', Rule::in($this->orderByValidator)],
            'status_by' => ['nullable', Rule::in(['asc', 'desc'])],
            'per_page' => ['nullable', 'integer', 'gte:1', 'lte:10000'],
            'page' => ['nullable', 'integer', 'gte:1'],
            // 'paginate' => ['nullable', 'boolean'],
        ];
    }
}
