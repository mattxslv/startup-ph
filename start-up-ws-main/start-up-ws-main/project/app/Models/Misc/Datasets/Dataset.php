<?php

namespace App\Models\Misc\Datasets;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Dataset extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;

    public const RESOURCE_KEY = 'datasets';

    public const FILLABLES = [
        'code',
        'value',
    ];

    public const FILTERS = [
        'code',
        'q',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = self::FILLABLES;

    protected $casts = [
        'value' => 'array'
    ];

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
            $query->where('code', $filters['code']);
        }

        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('code', 'like', '%' . $filters['q'] . '%')
                    ->orWhere('value', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Get dataset by code
     *
     * @param mixed $code
     * @return Dataset
     */
    public static function getDatasetByCode(mixed $code): Dataset
    {
        return Dataset::query()->where('code', $code)->firstOrFail();
    }
}
