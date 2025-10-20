<?php

namespace App\Models\Misc\AssessmentTags;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class AssessmentTag extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;

    public const RESOURCE_KEY = 'assessment_tags';

    public const FILLABLES = [
        'code',
        'description',
        'notes',
        'meta',
        'is_active',
    ];

    protected $casts = [
        'meta' => 'array'
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
                $q->where('description', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Get by code
     *
     * @param mixed $code
     * @return AssessmentTag
     */
    public static function getByCode($code): AssessmentTag
    {
        return AssessmentTag::where('code', $code)->firstOrFail();
    }
}
