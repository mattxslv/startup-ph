<?php

namespace App\Http\Controllers\Administrator\Misc;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Requirements\Requests\CreateRequirementRequest;
use App\Models\Misc\Requirements\Requests\UpdateRequirementRequest;
use App\Models\Misc\Requirements\Requirement;
use App\Models\Misc\Requirements\Resources\RequirementResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class RequirementController extends Controller
{
    /**
     * List requirements
     *
     * @param Request $request
     * @return RequirementResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Requirement::FILLABLES))->rules());

        $requirements = PaginationService::paginate(Requirement::filter($request->only(Requirement::FILTERS)));

        return RequirementResources::collection($requirements);
    }

    /**
     * Create requirements
     *
     * @param CreateRequirementRequest $request
     * @return RequirementResources
     */
    public function store(CreateRequirementRequest $request)
    {
        return new RequirementResources(Requirement::create($request->validated()));
    }

    /**
     * Show requirements
     *
     * @param Requirement $requirement
     * @return RequirementResources
     */
    public function show(Requirement $requirement)
    {
        return new RequirementResources($requirement);
    }

    /**
     * Update requirements
     *
     * @param UpdateRequirementRequest $request
     * @param Requirement $requirement
     * @return RequirementResources
     */
    public function update(UpdateRequirementRequest $request, Requirement $requirement)
    {
        $requirement->update($request->validated());

        return new RequirementResources($requirement);
    }

    /**
     * Delete requirements
     *
     * @param Requirement $requirement
     * @return RequirementResources
     */
    public function destroy(Requirement $requirement)
    {
        $requirement->delete();

        return new RequirementResources($requirement);
    }
}
