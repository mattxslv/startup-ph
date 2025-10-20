<?php

namespace App\Models\Addresses\Countries;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    public const RESOURCE_KEY = 'countries';

    protected $table = self::RESOURCE_KEY;

    public const FILLABLES = [
        'code',
        'name',
        'nationality',
    ];

    public const FILTERS = [
        'code',
        'q',
    ];

    protected $fillable = self::FILLABLES;

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
            $query->where(function ($q) use ($filters) {
                $q->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.nationality', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }
}
