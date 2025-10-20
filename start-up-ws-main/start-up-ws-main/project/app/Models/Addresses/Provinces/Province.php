<?php

namespace App\Models\Addresses\Provinces;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    public const RESOURCE_KEY = 'provinces';

    protected $table = self::RESOURCE_KEY;

    public const FILLABLES = [
        'code',
        'region_code',
        'name',
    ];

    public const FILTERS = [
        'region_code',
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
        if (isset($filters['region_code'])) {
            $query->where(self::RESOURCE_KEY . '.region_code', $filters['region_code']);
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
