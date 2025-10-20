<?php

namespace App\Models\Access;

use Spatie\Permission\Models\Permission as ModelsPermission;

class Permission extends ModelsPermission
{
    public const RESOURCE_KEY = 'permissions';

    public const FILLABLES = [
        'id',
        'group_id',
        'name',
        'guard_name',
    ];

    public const FILTERS = [
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
        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Group
     *
     * @return belongsTo
     */
    public function group()
    {
        return $this->belongsTo(PermissionGroup::class, 'group_id');
    }
}
