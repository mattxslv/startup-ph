<?php

namespace App\Http\Requests;

use App\Enums\Common;
use App\Models\Startups\Enums\StartupEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GetDashboardStatisticsRequest extends FormRequest
{
    /** 
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'filter' => ['required', Rule::in(Common::DASHBOARD_FILTER_TYPE)],
        ];

        if (request('filter') == Common::DASHBOARD_FILTER_TYPE['date_range']) {
            $rules['date_from'] = ['required', 'date'];
            $rules['date_to'] = ['required', 'date'];
        }

        return $rules;
    }
}
