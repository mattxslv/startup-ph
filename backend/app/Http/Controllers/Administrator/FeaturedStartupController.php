<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Startups\Startup;
use App\Models\Startups\Requests\FeatureStartupRequest;
use App\Models\Startups\Resources\StartupResources;
use App\Models\Startups\Services\FeatureStartupService;
use App\Services\PaginationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeaturedStartupController extends Controller
{
    /**
     * @var FeatureStartupService $featureService
     */
    private $featureService;

    public function __construct(FeatureStartupService $featureService)
    {
        $this->featureService = $featureService;
    }

    /**
     * List startups
     *
     * @param Request $request
     * @return StartupResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Startup::FILLABLES))->rules());

        $startups = PaginationService::paginate(
            Startup::filter($request->only(Startup::FILTERS))->where('is_featured', 1),
            'feature_sequence',
            'asc'
        );

        return StartupResources::collection($startups);
    }

    /**
     * Update
     *
     * @param FeatureStartupRequest $request
     * @return StartupResources
     */
    public function update(FeatureStartupRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $this->featureService->feature($request->get('startups'));

            return $this->index(new Request());
        });
    }
}
