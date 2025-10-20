<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetDashboardStatisticsRequest;
use App\Models\Misc\AssessmentTags\AssessmentTag;
use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Requests\GetStartupByLocationRequest;
use App\Models\Startups\Requests\GetStartupCountRequest;
use App\Models\Startups\Startup;
use App\Services\DashBoardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get statistics
     *
     * @return JsonResponse
     */
    public function getStatictics(GetDashboardStatisticsRequest $request)
    {
        $statistics = (new DashBoardService())->getStatictics($request->validated());

        return response()->json([
            'query' => $request->validated(),
            'statistics' => $statistics
        ]);
    }

    /**
     * Get startup count
     *
     * @param GetStartupCountRequest $request
     * @return JsonResponse
     */
    public function getStartupCount(GetStartupCountRequest $request)
    {
        $statistics = (new DashBoardService())->getStartupCount(
            type: $request->get('type'),
            status: $request->get('status'),
            dateFrom: $request->get('date_from'),
            dateTo: $request->get('date_to')
        );

        return response()->json(['statistics' => $statistics]);
    }

    /**
     * Startup address by code
     *
     * @param GetStartupByLocationRequest $request
     * @return JsonResponse
     */
    public function startupByAddressCode(GetStartupByLocationRequest $request)
    {
        $statistics = (new DashBoardService())->startupByAddressCode(
            $request->validated(),
            $request->only(Startup::FILTERS)
        );

        return response()->json(['statistics' => $statistics]);
    }

    /**
     * Start up by status
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function startupByStatus(Request $request)
    {
        $statistics = (new DashBoardService())->startupBySubject(
            subject: 'status',
            filters: $request->only(Startup::FILTERS)
        );

        return response()->json(['statistics' => $statistics]);
    }

    /**
     * Startup by address geoloc
     *
     * @param GetStartupByLocationRequest $request
     * @return JsonResponse
     */
    public function startupByAddressGeoloc(GetStartupByLocationRequest $request)
    {
        $statistics = (new DashBoardService())->startupByAddressGeoloc($request->validated());

        return response()->json(['statistics' => $statistics]);
    }

    /**
     * Startup by assessment tags
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function startupByAssessmentTags(Request $request)
    {
        $filters = $request->only(Startup::FILTERS);

        $filters['status'] = StartupEnum::STATUS['FOR RESUBMISSION'];

        $statistics = (new DashBoardService())->startupBySubject(
            subject: 'assessment_tags',
            filters: $filters,
            labelFormatter: $this->generateAssessmentTagsFormatter()
        );

        return response()->json(['statistics' => $statistics]);
    }

    /**
     * Generate assessment tags formatter
     *
     * @return callable
     */
    protected function generateAssessmentTagsFormatter(): callable
    {
        $tags = AssessmentTag::get();

        return function ($key) use ($tags) {
            $label = 'OTHERS';

            if ($tag = $tags->where('code', $key)->first()) {
                $label = strtoupper($tag->description);
            }

            return $label;
        };
    }
}
