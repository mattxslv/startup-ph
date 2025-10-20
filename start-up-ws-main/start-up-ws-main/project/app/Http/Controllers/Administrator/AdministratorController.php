<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Administrators\Administrator;
use App\Models\Administrators\Requests\CreateAdministratorRequest;
use App\Models\Administrators\Requests\SyncRoleRequest;
use App\Models\Administrators\Requests\UpdateAdministratorPasswordRequest;
use App\Models\Administrators\Requests\UpdateAdministratorRequest;
use App\Models\Administrators\Resources\AdministratorResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class AdministratorController extends Controller
{
    /**
     * List administrators
     *
     * @param Request $request
     * @return AdministratorResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Administrator::FILLABLES))->rules());

        $administrators = PaginationService::paginate(
            Administrator::filter($request->only(Administrator::FILTERS)),
            'first_name',
            'asc'
        );

        return AdministratorResources::collection($administrators);
    }

    /**
     * Create admninistrator
     *
     * @param CreateAdministratorRequest $request
     * @return AdministratorResources
     */
    public function store(CreateAdministratorRequest $request)
    {
        $administrator = Administrator::create($request->validated());

        $administrator->generateTemporaryPassword();

        return new AdministratorResources($administrator);
    }

    /**
     * Show administrator
     *
     * @param Administrator $administrator
     * @return AdministratorResources
     */
    public function show(Administrator $administrator)
    {
        return new AdministratorResources($administrator->load('roles'));
    }

    /**
     * Update administrator
     *
     * @param UpdateAdministratorRequest $request
     * @param Administrator $administrator
     * @return AdministratorResources
     */
    public function update(UpdateAdministratorRequest $request, Administrator $administrator)
    {
        $administrator->update($request->validated());

        return new AdministratorResources($administrator);
    }

    /**
     * Delete administrator
     *
     * @param Administrator $administrator
     * @return AdministratorResources
     */
    public function destroy(Administrator $administrator)
    {
        $administrator->delete();

        return new AdministratorResources($administrator);
    }

    /**
     * Update passord
     *
     * @param UpdateAdministratorPasswordRequest $request
     * @param Administrator $administrator
     * @return AdministratorResources
     */
    public function updatePassword(UpdateAdministratorPasswordRequest $request, Administrator $administrator)
    {
        $administrator->update($request->validated());

        return new AdministratorResources($administrator);
    }

    /**
     * Reset password
     *
     * @param Administrator $administrator
     * @return AdministratorResources
     */
    public function resetPassword(Administrator $administrator)
    {
        $administrator->generateTemporaryPassword();

        return new AdministratorResources($administrator);
    }

    /**
     * Sync roles
     *
     * @param SyncRoleRequest $request
     * @param Administrator $administrator
     * @return AdministratorResources
     */
    public function syncRoles(SyncRoleRequest $request, Administrator $administrator)
    {
        $administrator->syncRoles($request->get('roles'));

        return new AdministratorResources($administrator);
    }
}
