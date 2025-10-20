<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Startups\Requirements\Requests\CreateOrUpdateStartupRequirementRequest;
use App\Models\Startups\Requirements\Resources\StartupRequirementResources;
use App\Models\Startups\Requirements\StartupRequirement;
use App\Models\Users\User;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class StartupRequirementController extends Controller
{
    /**
     * List requirements
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(StartupRequirement::FILLABLES))->rules());

        $startup = User::authenticated()->getStartup();

        $requirements = PaginationService::paginate(
            $startup->requirements()->isActive()->filter($request->only(StartupRequirement::FILTERS))
        );

        return StartupRequirementResources::collection($requirements);
    }

    /**
     * Create or Update requirement
     *
     * @param CreateOrUpdateStartupRequirementRequest $request
     * @return StartupRequirementResources
     */
    public function store(CreateOrUpdateStartupRequirementRequest $request)
    {
        $startup = User::authenticated()->getStartup();

        $requirement = $startup->createOrUpdateRequirements($request->validated());

        return new StartupRequirementResources($requirement);
    }
}
