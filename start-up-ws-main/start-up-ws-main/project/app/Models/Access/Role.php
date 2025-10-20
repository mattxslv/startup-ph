<?php

namespace App\Models\Access;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\Models\Role as ModelsRole;
use Spatie\Permission\PermissionRegistrar;

class Role extends ModelsRole implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    public const RESOURCE_KEY = 'roles';

    public const SORTS = [
        'id',
        'name',
    ];

    public const FILTERS = [
        'q',
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
        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * A role may be given various permissions.
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(
            Permission::class,
            config('permission.table_names.role_has_permissions'),
            PermissionRegistrar::$pivotRole,
            PermissionRegistrar::$pivotPermission
        );
    }

    /**
     * Sync permissions
     *
     * @param mixed ...$permissions
     * @return Role
     */
    public function syncPermissions(...$permissions): Role
    {
        $this->auditSync('permissions', array_unique($permissions[0]));

        return $this;
    }
}
