<?php

namespace App\Models\Startups\Requests;

use App\Enums\Common;
use App\Models\Startups\Enums\StartupEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetStartupCountRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'type' => ['required', Rule::in(Common::DASHBOARD_DATE_TYPE)],
            'date_from' => ['required', 'date'],
            'date_to' => ['required', 'date'],
            'status' => ['required', Rule::in(StartupEnum::STATUS)],
        ];
    }
}
