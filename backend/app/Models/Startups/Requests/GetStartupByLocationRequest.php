<?php

namespace App\Models\Startups\Requests;

use App\Enums\Common;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetStartupByLocationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $validator['level'] = ['required', Rule::in(Common::LOCATION_SUBJECTS)];

        if (request('level') != Common::LOCATION_SUBJECTS['all']) {
            $validator[request('level') . '_code'] = [
                'required',
                Rule::exists(\Str::plural(request('level')), 'code'),
            ];
        }

        return $validator;
    }
}
