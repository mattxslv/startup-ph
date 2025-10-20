<?php

namespace App\Http\Controllers\Administrator\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Applications\Application;
use App\Models\Applications\Requests\RejectApplicationRequest;
use App\Models\Applications\Requests\ReturnApplicationForResubmissionRequest;
use App\Models\Applications\Resources\ApplicationResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class ApplicationController extends Controller
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

        $applications = PaginationService::paginate(Application::filter($request->only(Application::FILTERS)));

        return ApplicationResources::collection($applications);
    }

    /**
     * Show application
     *
     * @param Application $program
     * @return ApplicationResources
     */
    public function show(Application $application)
    {
        return new ApplicationResources($application->load('user', 'startup', 'program', 'requirements'));
    }

    /**
     * Approve application
     *
     * @param Application $application
     * @return ApplicationResources
     */
    public function approve(Application $application)
    {
        $application->approve();

        return new ApplicationResources($application);
    }

    /**
     * Reject application
     *
     * @param RejectApplicationRequest $request
     * @param Application $application
     * @return ApplicationResources
     */
    public function reject(RejectApplicationRequest $request, Application $application)
    {
        $application->reject($request->get('remarks'));

        return new ApplicationResources($application);
    }

    /**
     * Return for resubmission
     *
     * @param ReturnApplicationForResubmissionRequest $request
     * @param Application $application
     * @return ApplicationResources
     */
    public function returnForResubmission(ReturnApplicationForResubmissionRequest $request, Application $application)
    {
        $application->returnForResubmission($request->get('remarks'));

        return new ApplicationResources($application);
    }
}
