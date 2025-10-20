<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Startups\Startup;
use App\Models\Startups\Resources\StartupResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class FeaturedStartupController extends Controller
{
    /**
     * List startups
     *
     * @param Request $request
     * @return StartupResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Startup::FILLABLES))->rules());

        $startups = PaginationService::paginate(
            Startup::filter($request->only(Startup::FILTERS))->where('is_featured', 1),
            'feature_sequence',
            'asc'
        );

        return StartupResources::collection($startups->load('owner'));
    }
}
