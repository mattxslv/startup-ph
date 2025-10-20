<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Applications\Application;
use App\Models\Applications\Requests\SubmitApplicationRequest;
use App\Models\Applications\Resources\ApplicationResources;
use App\Models\Users\User;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class StartupApplicationController extends Controller
{
    /**
     * List applications
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Application::FILLABLES))->rules());

        $startup = User::authenticated()->getStartup();

        $applications = PaginationService::paginate(
            $startup->applications()->with('program')->filter($request->only(Application::FILTERS))
        );

        return ApplicationResources::collection($applications);
    }

    /**
     * Create application
     *
     * @param SubmitApplicationRequest $request
     * @return ApplicationResources
     */
    public function store(SubmitApplicationRequest $request)
    {
        $startup = User::authenticated()->getStartup();

        $application = $startup->submitApplication($request->validated());

        return new ApplicationResources($application);
    }

    /**
     * Show application
     *
     * @param mixed $id
     * @return ApplicationResources
     */
    public function show($id)
    {
        $startup = User::authenticated()->getStartup();

        $application = $startup->getApplicationById($id);

        return new ApplicationResources($application->load('program', 'requirements'));
    }

    /**
     * Resubmit application
     *
     * @param mixed $id
     * @return ApplicationResources
     */
    public function resubmit($id)
    {
        $startup = User::authenticated()->getStartup();

        $application = $startup->getApplicationById($id);

        $application->resubmit();

        return new ApplicationResources($application);
    }
}
