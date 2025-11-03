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
    /**
     * @return JsonResponse
     */
    public function startupByAssessmentTags(Request $request)
    {
        // Validate the request to accept parameters but not require them
        $validated = $request->validate([
            'order_by' => 'sometimes|string',
            'status_by' => 'sometimes|string',
            'date_from' => 'sometimes|string|nullable',
            'date_to' => 'sometimes|string|nullable',
        ]);

        // Return empty statistics for now (stub implementation)
        return response()->json([
            'statistics' => [
                'total' => 0,
                'by_assessment_tags' => [],
            ]
        ]);
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

    /**
     * Get comprehensive statistics for admin dashboard
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function comprehensiveStatistics(Request $request)
    {
        $filters = $request->only(Startup::FILTERS);
        
        // Overview metrics
        $overview = [
            'total' => Startup::filter($filters)->count(),
            'verified' => Startup::filter(array_merge($filters, ['status' => StartupEnum::STATUS['VERIFIED']]))->count(),
            'for_verification' => Startup::filter(array_merge($filters, ['status' => StartupEnum::STATUS['FOR VERIFICATION']]))->count(),
            'rejected' => Startup::filter(array_merge($filters, ['status' => StartupEnum::STATUS['REJECTED']]))->count(),
            'for_resubmission' => Startup::filter(array_merge($filters, ['status' => StartupEnum::STATUS['FOR RESUBMISSION']]))->count(),
        ];

        // By city (top 10)
        $byCity = Startup::filter($filters)
            ->selectRaw('municipality_code, COUNT(*) as count')
            ->whereNotNull('municipality_code')
            ->groupBy('municipality_code')
            ->orderByDesc('count')
            ->limit(10)
            ->get()
            ->map(function ($item) {
                $municipality = \App\Models\Addresses\Municipalities\Municipality::find($item->municipality_code);
                return [
                    'label' => $municipality ? $municipality->name : $item->municipality_code,
                    'value' => $item->municipality_code,
                    'count' => $item->count
                ];
            });

        // By sector
        $bySector = Startup::filter($filters)
            ->selectRaw('sectors, COUNT(*) as count')
            ->whereNotNull('sectors')
            ->where('sectors', '!=', '')
            ->groupBy('sectors')
            ->orderByDesc('count')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => $item->sectors,
                    'count' => $item->count
                ];
            });

        // By region
        $byRegion = Startup::filter($filters)
            ->selectRaw('region_code, COUNT(*) as count')
            ->whereNotNull('region_code')
            ->groupBy('region_code')
            ->orderByDesc('count')
            ->get()
            ->map(function ($item) {
                $region = \App\Models\Addresses\Regions\Region::find($item->region_code);
                return [
                    'label' => $region ? $region->name : $item->region_code,
                    'value' => $item->region_code,
                    'count' => $item->count
                ];
            });

        // By development phase
        $byPhase = Startup::filter($filters)
            ->selectRaw('development_phase, COUNT(*) as count')
            ->whereNotNull('development_phase')
            ->groupBy('development_phase')
            ->orderByDesc('count')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => $item->development_phase,
                    'count' => $item->count
                ];
            });

        // By user type (from users table)
        $byUserType = \DB::table('users')
            ->join('startups', 'users.id', '=', 'startups.user_id')
            ->select('users.user_type', \DB::raw('COUNT(DISTINCT startups.id) as count'))
            ->groupBy('users.user_type')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => ucfirst($item->user_type ?? 'Unknown'),
                    'count' => $item->count
                ];
            });

        return response()->json([
            'overview' => $overview,
            'by_city' => $byCity,
            'by_sector' => $bySector,
            'by_region' => $byRegion,
            'by_phase' => $byPhase,
            'by_user_type' => $byUserType,
        ]);
    }

    /**
     * Get startup by regions (database-based, no Elasticsearch)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function startupByRegions(Request $request)
    {
        // Validate the request to accept parameters but not require them
        $validated = $request->validate([
            'per_page' => 'sometimes|integer|max:10000',
            'level' => 'sometimes|string',
            'region_code' => 'sometimes|string',
            'province_code' => 'sometimes|string',
            'municipality_code' => 'sometimes|string',
            'sector' => 'sometimes|string',
        ]);
        
        // Get all startups by region
        $regions = Startup::selectRaw('region_code, COUNT(*) as count')
            ->whereNotNull('region_code')
            ->groupBy('region_code')
            ->orderByDesc('count')
            ->get()
            ->map(function ($item) {
                $region = \App\Models\Addresses\Regions\Region::find($item->region_code);
                return [
                    'label' => $region ? $region->name : 'OTHERS',
                    'value' => $item->region_code,
                    'count' => (int)$item->count
                ];
            });

        $total = Startup::whereNotNull('region_code')->count();

        return response()->json([
            'statistics' => [
                'total' => $total,
                'key' => 'regions',
                'regions' => $regions,
            ]
        ]);
    }

    /**
     * Get startups with expiring or expired permits
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function expiringPermits(Request $request)
    {
        $validated = $request->validate([
            'days_ahead' => 'sometimes|integer|min:1|max:365',
            'status' => 'sometimes|string|in:expiring,expired,all',
            'per_page' => 'sometimes|integer|max:100',
        ]);

        $daysAhead = $validated['days_ahead'] ?? 30;
        $status = $validated['status'] ?? 'all';
        $perPage = $validated['per_page'] ?? 20;

        $query = Startup::whereNotNull('business_certificate_expiration_date');

        $now = now();
        $futureDate = now()->addDays($daysAhead);

        if ($status === 'expired') {
            $query->where('business_certificate_expiration_date', '<', $now);
        } elseif ($status === 'expiring') {
            $query->whereBetween('business_certificate_expiration_date', [$now, $futureDate]);
        } else {
            // all: both expired and expiring
            $query->where('business_certificate_expiration_date', '<=', $futureDate);
        }

        $startups = $query->with('user')->orderBy('business_certificate_expiration_date')->paginate($perPage);

        $statistics = [
            'expired_count' => Startup::whereNotNull('business_certificate_expiration_date')
                ->where('business_certificate_expiration_date', '<', $now)
                ->count(),
            'expiring_30_days' => Startup::whereNotNull('business_certificate_expiration_date')
                ->whereBetween('business_certificate_expiration_date', [$now, now()->addDays(30)])
                ->count(),
            'expiring_15_days' => Startup::whereNotNull('business_certificate_expiration_date')
                ->whereBetween('business_certificate_expiration_date', [$now, now()->addDays(15)])
                ->count(),
            'expiring_7_days' => Startup::whereNotNull('business_certificate_expiration_date')
                ->whereBetween('business_certificate_expiration_date', [$now, now()->addDays(7)])
                ->count(),
        ];

        return response()->json([
            'statistics' => $statistics,
            'startups' => $startups,
        ]);
    }
}
