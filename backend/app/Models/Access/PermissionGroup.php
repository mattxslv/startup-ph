<?php

namespace App\Models\Access;

use Illuminate\Database\Eloquent\Model;

class PermissionGroup extends Model
{
    public const RESOURCE_KEY = 'permission_groups';

    public const FILLABLES = [
        'id',
        'name',
        'menu',
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
     * Permissions
     *
     * @return hasMany
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class, 'group_id');
    }
}
