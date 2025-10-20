<?php

namespace App\Models\Misc\Remarks;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Remark extends Model
{
    use SoftDeletes;

    public const RESOURCE_KEY = 'remarks';

    public const FILLABLES = [
        'concern',
        'recommendation',
        'is_active',
    ];

    public const FILTERS = [
        'is_active',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
        if (isset($filters['is_active'])) {
            $query->where(self::RESOURCE_KEY . '.is_active', $filters['is_active']);
        }

        return $query;
    }

    /**
     * Scope is active
     *
     * @param mixed $query
     * @return $query
     */
    public function scopeIsActive($query)
    {
        return $query->where('is_active', 1);
    }
}
