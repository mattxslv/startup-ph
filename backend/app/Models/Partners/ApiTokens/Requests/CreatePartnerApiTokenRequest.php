<?php

namespace App\Models\Partners\ApiTokens\Requests;

use App\Models\Partners\ApiTokens\Enums\PartnerApiTokenEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Ramsey\Uuid\Uuid;

class CreatePartnerApiTokenRequest extends FormRequest
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
            'name' => ['required', 'min:3', 'max:100'],
            'scope' => ['required', 'array'],
            'scope.*' => ['required', Rule::in(PartnerApiTokenEnum::ACCESS_SCOPES)],
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function attributes()
    {
        return [
            'scope.*' => 'scope'
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function validated($key = null, $default = null)
    {
        return [...parent::validated(), 'secret' => str_replace('-', '', Uuid::uuid4()),];
    }
}
