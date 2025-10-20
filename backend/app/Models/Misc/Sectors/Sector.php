<?php

namespace App\Models\Misc\Sectors;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sector extends Model
{
    use SoftDeletes;

    public const RESOURCE_KEY = 'sectors';

    public const FILLABLES = [
        'name',
        'is_active',
    ];

    public const FILTERS = [
        'is_active',
        'q',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = self::FILLABLES;

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['is_active'])) {
            $query->where(self::RESOURCE_KEY . '.is_active', $filters['is_active']);
        }

        if (isset($filters['q'])) {
            $query->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%');
        }

        return $query;
    }
}
