<?php

namespace App\Models\Startups\Requirements;

use App\Models\Misc\Requirements\Requirement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class StartupRequirement extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;

    public const RESOURCE_KEY = 'startup_requirements';

    public const FILLABLES = [
        'startup_id',
        'requirement_id',
        'requirement_code',
        'requirement_name',
        'value',
        'is_active',
    ];

    protected $casts = [];

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
            $query->where('is_active', $filters['is_active']);
        }

        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('requirement_name', 'like', '%' . $filters['q'] . '%');
            });
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

    /**
     * Parent
     *
     * @return BelongsTo
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Requirement::class, 'requirement_id')->withTrashed();
    }
}
