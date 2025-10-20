<?php

namespace App\Models\Addresses\Regions;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    public const RESOURCE_KEY = 'regions';

    protected $table = self::RESOURCE_KEY;

    public const FILLABLES = [
        'code',
        'name',
    ];

    public const FILTERS = [
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
        if (isset($filters['code'])) {
            $query->where(self::RESOURCE_KEY . '.code', $filters['code']);
        }

        if (isset($filters['q'])) {
            $query->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%');
        }

        return $query;
    }
}
