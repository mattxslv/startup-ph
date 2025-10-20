<?php

namespace App\Models\Addresses\Barangays;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    public const RESOURCE_KEY = 'barangays';

    protected $table = self::RESOURCE_KEY;

    public const FILLABLES = [
        'code',
        'region_code',
        'province_code',
        'municipality_code',
        'name',
    ];

    public const FILTERS = [
        'province_code',
        'municipality_code',
        'code',
        'q',
    ];

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    /**
     * Scope filter
     *
     * @param mixed $query
     * @param mixed $filters
     * @return $query
     */
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['province_code'])) {
            $query->where(self::RESOURCE_KEY . '.province_code', $filters['province_code']);
        }

        if (isset($filters['municipality_code'])) {
            $query->where(self::RESOURCE_KEY . '.municipality_code', $filters['municipality_code']);
        }

        if (isset($filters['code'])) {
            $query->where(self::RESOURCE_KEY . '.code', $filters['code']);
        }

        if (isset($filters['q'])) {
            $query->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%');
        }

        return $query;
    }
}
