<?php

namespace App\Http\Controllers\Administrator\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Access\Requests\CreateRoleRequest;
use App\Models\Access\Requests\SyncPermissionRequest;
use App\Models\Access\Requests\UpdateRoleRequest;
use App\Models\Access\Resources\RoleResources;
use App\Models\Access\Role;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * List roles
     *
     * @param Request $request
     * @return RoleResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Role::SORTS))->rules());

        $roles = PaginationService::paginate(Role::filter($request->only(Role::FILTERS)), 'name', 'asc');

        return RoleResources::collection($roles);
    }

    /**
     * Create role
     *
     * @param CreateRoleRequest $request
     * @return RoleResources
     */
    public function store(CreateRoleRequest $request)
    {
        return new RoleResources(Role::create($request->validated()));
    }

    /**
     * Show role
     *
     * @param Role $role
     * @return RoleResources
     * @return void
     */
    public function show(Role $role)
    {
        return new RoleResources($role->load('permissions'));
    }

    /**
     * Update role
     *
     * @param UpdateRoleRequest $request
     * @param Role $role
     * @return RoleResources
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $role->update($request->validated());

        return new RoleResources($role);
    }

    /**
     * Delete role
     *
     * @param Role $role
     * @return RoleResources
     */
    public function destroy(Role $role)
    {
        $role->delete();

        return new RoleResources($role);
    }

    /**
     * Sync permissions
     *
     * @param SyncPermissionRequest $request
     * @param Role $role
     * @return RoleResources
     */
    public function syncPermissions(SyncPermissionRequest $request, Role $role)
    {
        $role->syncPermissions($request->get('permissions'));

        return new RoleResources($role);
    }
}
