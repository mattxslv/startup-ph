<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Startups\Requests\DraftStartupRequest;
use App\Models\Startups\Requests\SubmitStartupForVerificationRequest;
use App\Models\Startups\Startup;
use App\Models\Startups\Resources\StartupResources;
use App\Models\Users\User;

class StartupController extends Controller
{
    /**
     * Show startup
     *
     * @return StartupResources
     */
    public function show()
    {
        $startup = User::authenticated()->getStartup();

        return new StartupResources($startup);
    }

    /**
     * Update or create startup
     *
     * @param DraftStartupRequest $request
     * @return StartupResources
     */
    public function store(DraftStartupRequest $request)
    {
        $startup = User::authenticated()->createOrUpdateStartup($request->validated());

        return new StartupResources($startup->fresh());
    }

    /**
     * Submit for verificatioh
     *
     * @param SubmitStartupForVerificationRequest $request
     * @return StartupResources
     */
    public function submitForVerification(SubmitStartupForVerificationRequest $request)
    {
        $startup = User::authenticated()->createOrUpdateStartup($request->validated());

        $startup->submitForVerification();

        return new StartupResources($startup->fresh());
    }

    /**
     * Resubmit
     *
     * @param SubmitStartupForVerificationRequest $request
     * @return StartupResources
     */
    public function resubmit(SubmitStartupForVerificationRequest $request)
    {
        $startup = User::authenticated()->createOrUpdateStartup($request->validated());

        $startup->resubmit();

        return new StartupResources($startup->fresh());
    }
}
