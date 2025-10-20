<?php

namespace App\Http\Controllers\Administrator\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Access\Permission;
use App\Models\Access\Requests\CreatePermissionRequest;
use App\Models\Access\Requests\UpdatePermissionRequest;
use App\Models\Access\Resources\PermissionResources;
use App\Models\Access\Resources\RoleResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * List permissions
     *
     * @param Request $request
     * @return RoleResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Permission::FILLABLES))->rules());

        $permissions = PaginationService::paginate(
            Permission::filter($request->only(Permission::FILTERS)),
            'name',
            'asc'
        );

        return PermissionResources::collection($permissions);
    }

    /**
     * Create permission
     *
     * @param CreatePermissionRequest $request
     * @return PermissionResources
     */
    public function store(CreatePermissionRequest $request)
    {
        return new PermissionResources(Permission::create($request->validated()));
    }

    /**
     * Show permission
     *
     * @param Permission $permission
     * @return PermissionResources
     */
    public function show(Permission $permission)
    {
        return new PermissionResources($permission);
    }

    /**
     * Update permission
     *
     * @param UpdatePermissionRequest $request
     * @param mixed $id
     * @return PermissionResources
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $permission->update($request->validated());

        return new PermissionResources($permission);
    }

    /**
     * Delete permission
     *
     * @param Permission $permission
     * @return PermissionResources
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return new PermissionResources($permission);
    }
}
