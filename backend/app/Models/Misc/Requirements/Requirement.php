<?php

namespace App\Models\Misc\Requirements;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Requirement extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;

    public const RESOURCE_KEY = 'requirements';

    public const FILLABLES = [
        'code',
        'name',
        'type',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array'
    ];

    public const FILTERS = [
        'q',
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
        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('code', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }
}
