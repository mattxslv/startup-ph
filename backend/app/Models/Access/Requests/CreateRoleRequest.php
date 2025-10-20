<?php

namespace App\Models\Access\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateRoleRequest extends FormRequest
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
            'name' => ['required', Rule::unique('roles')]
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        return [...parent::validated(), 'guard_name' => 'api'];
    }
}
