<?php

namespace App\Http\Controllers\Administrator\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Access\Permission;
use App\Models\Access\PermissionGroup;
use App\Models\Access\Requests\CreatePermissionGroupRequest;
use App\Models\Access\Requests\UpdatePermissionGroupRequest;
use App\Models\Access\Resources\PermissionGroupResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class PermissionGroupController extends Controller
{
    /**
     * List permission groups
     *
     * @param Request $request
     * @return PermissionGroupResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(PermissionGroup::FILLABLES))->rules());

        $groups = PaginationService::paginate(
            PermissionGroup::filter($request->only(PermissionGroup::FILTERS)),
            'menu',
            'asc'
        );

        return PermissionGroupResources::collection($groups);
    }

    /**
     * Create permission group
     *
     * @param CreatePermissionGroupRequest $request
     * @return PermissionGroupResources
     */
    public function store(CreatePermissionGroupRequest $request)
    {
        return new PermissionGroupResources(PermissionGroup::create($request->validated()));
    }

    /**
     * Show permission group
     *
     * @param PermissionGroup $group
     * @return PermissionGroupResources
     */
    public function show(PermissionGroup $permissionGroup)
    {
        return new PermissionGroupResources($permissionGroup);
    }

    /**
     * Update permission group
     *
     * @param UpdatePermissionGroupRequest $request
     * @param PermissionGroup $permissionGroup
     * @return PermissionGroupResources
     */
    public function update(UpdatePermissionGroupRequest $request, PermissionGroup $permissionGroup)
    {
        $permissionGroup->update($request->validated());

        return new PermissionGroupResources($permissionGroup);
    }

    /**
     * Delete permission group
     *
     * @param PermissionGroup $permissionGroup
     * @return PermissionGroupResources
     */
    public function destroy(PermissionGroup $permissionGroup)
    {
        $permissionGroup->delete();

        return new PermissionGroupResources($permissionGroup);
    }
}
