<?php

namespace App\Models\Access\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreatePermissionRequest extends FormRequest
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
            'group_id' => ['required', Rule::exists('permission_groups', 'id')],
            'name' => ['required', 'alpha_dash:ascii', Rule::unique('permissions')]
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
