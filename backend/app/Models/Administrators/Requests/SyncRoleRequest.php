<?php

namespace App\Models\Administrators\Requests;

use App\Enums\Common;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class SyncRoleRequest extends FormRequest
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
            'roles' => ['required', 'array'],
            'roles.*' => ['required', Rule::in(Role::pluck('id'))],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function attributes()
    {
        return [
            'roles.*' => 'role'
        ];
    }
}
