<?php

namespace App\Enums;

class Common
{
    public const SUFFIX_NAMES = ['JR', 'SR', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

    public const GENDERS = [
        'M' => 'M',
        'F' => 'F'
    ];

    public const EGOV_GENDERS = [
        'male' => 'M',
        'female' => 'F'
    ];

    public const PROFILE_TYPES = [
        'STARTUP' => 'STARTUP',
        'INDIVIDUAL' => 'INDIVIDUAL'
    ];

    public const LOCATION_SUBJECTS = [
        'all' => 'all',
        'region' => 'region',
        'province' => 'province',
        'municipality' => 'municipality',
        'barangay' => 'barangay',
    ];

    public const DASHBOARD_DATE_TYPE = [
        'hour' => 'hour',
        'day' => 'day',
        'month' => 'month',
    ];

    public const DASHBOARD_FILTER_TYPE = [
        'all_time' => 'all_time',
        'current_day' => 'current_day',
        'current_month' => 'current_month',
        'current_year' => 'current_year',
        'date_range' => 'date_range',
    ];
}
