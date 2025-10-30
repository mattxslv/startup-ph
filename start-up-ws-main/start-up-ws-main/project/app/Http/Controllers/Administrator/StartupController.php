<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Applications\Application;
use App\Models\Applications\Resources\ApplicationResources;
use App\Models\Startups\Requests\FlagStartupRequest;
use App\Models\Startups\Requests\ReturnStartupRequest;
use App\Models\Startups\Requests\StartupAdditionalRequirementRequest;
use App\Models\Startups\Startup;
use App\Models\Startups\Resources\StartupResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StartupController extends Controller
{
    /**
     * List application
     *
     * @param Request $request
     * @return StartupResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Startup::FILLABLES))->rules());

        // Use database query instead of Elasticsearch since Scout is disabled
        $startups = PaginationService::paginate(Startup::filter($request->only(Startup::FILTERS)));

        return StartupResources::collection($startups);
    }

    /**
     * List startups
     *
     * @param Request $request
     * @return StartupResources
     */
    public function indexFromDB(Request $request)
    {
        $request->validate((new PaginateRequest(Startup::FILLABLES))->rules());

        $startups = PaginationService::paginate(Startup::filter($request->only(Startup::FILTERS)));

        return StartupResources::collection($startups);
    }

    /**
     * Show startup
     *
     * @param Startup $startup
     * @return StartupResources
     */
    public function show(Startup $startup)
    {
        return new StartupResources($startup->load('user'));
    }

    /**
     * Verify startup
     *
     * @param Startup $startup
     * @return StartupResources
     */
    public function verify(Startup $startup)
    {
        $startup->verify();

        return new StartupResources($startup);
    }

    /**
     * Return for resubmission
     *
     * @param ReturnStartupRequest $request
     * @param Startup $startup
     * @return StartupResources
     */
    public function returnForResubmision(ReturnStartupRequest $request, Startup $startup)
    {
        $startup->returnForResubmision($request->validated());

        return new StartupResources($startup);
    }

    /**
     * Flag startup
     *
     * @param Startup $startup
     * @param FlagStartupRequest $request
     * @return StartupResources
     */
    public function flag(Startup $startup, FlagStartupRequest $request)
    {
        $startup->flag($request->get('flag'));

        return new StartupResources($startup);
    }

    /**
     * Additional requirements
     *
     * @param Startup $startup
     * @param StartupAdditionalRequirementRequest $request
     * @return StartupResources
     */
    public function additionalRequirements(Startup $startup, StartupAdditionalRequirementRequest $request)
    {
        $startup->additionalRequirements($request->validated());

        return new StartupResources($startup);
    }

    /**
     * Publsih
     *
     * @param Startup $startup
     * @return StartupResources
     */
    public function publish(Startup $startup)
    {
        $startup->publish();

        return new StartupResources($startup);
    }

    /**
     * Applications
     *
     * @param Startup $startup
     * @return AnonymousResourceCollection
     */
    public function applications(Request $request, Startup $startup): AnonymousResourceCollection
    {
        $request->validate((new PaginateRequest(Application::FILLABLES))->rules());

        $applications = PaginationService::paginate(
            $startup->applications()->with('program')->filter($request->only(Application::FILTERS))
        );

        return ApplicationResources::collection($applications);
    }
}
