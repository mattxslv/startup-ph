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
        
        // Add sector filter if provided
        if ($request->has('sector') && !empty($request->sector)) {
            $filters['sector'] = $request->sector;
        }
        
        // Overview metrics
        $overview = [
            'total_startups' => Startup::filter($filters)->count(),
            'verified_startups' => Startup::filter(array_merge($filters, ['status' => StartupEnum::STATUS['VERIFIED']]))->count(),
            'for_verification' => Startup::filter(array_merge($filters, ['status' => StartupEnum::STATUS['FOR VERIFICATION']]))->count(),
            'total_users' => \DB::table('users')->count(),
        ];

        // By city (top 10)
        $byCityQuery = Startup::filter($filters)
            ->selectRaw('municipality_code, COUNT(*) as count')
            ->whereNotNull('municipality_code')
            ->groupBy('municipality_code')
            ->orderByDesc('count')
            ->limit(10)
            ->get();

        $byCity = $byCityQuery->map(function ($item) {
                $municipality = \App\Models\Addresses\Municipalities\Municipality::find($item->municipality_code);
                return [
                    'label' => $municipality ? $municipality->name : $item->municipality_code,
                    'value' => $item->municipality_code,
                    'count' => $item->count
                ];
            });

        // By sector
        $bySectorQuery = Startup::filter($filters)
            ->selectRaw('sectors, COUNT(*) as count')
            ->whereNotNull('sectors')
            ->where('sectors', '!=', '')
            ->groupBy('sectors')
            ->orderByDesc('count')
            ->get();

        $bySector = $bySectorQuery->map(function ($item) {
                // Handle both string and array cases
                if (is_string($item->sectors)) {
                    $sectors = json_decode($item->sectors, true);
                    $sectorName = is_array($sectors) && count($sectors) > 0 ? $sectors[0] : $item->sectors;
                } else {
                    $sectorName = is_array($item->sectors) && count($item->sectors) > 0 ? $item->sectors[0] : 'Unknown';
                }
                return [
                    'label' => $sectorName,
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
        $byPhaseQuery = Startup::filter($filters)
            ->selectRaw('development_phase, COUNT(*) as count')
            ->whereNotNull('development_phase')
            ->groupBy('development_phase')
            ->orderByDesc('count')
            ->get();

        $byPhase = $byPhaseQuery->map(function ($item) {
                return [
                    'label' => $item->development_phase,
                    'count' => $item->count
                ];
            });

        // By status
        $byStatusQuery = Startup::filter($filters)
            ->selectRaw('status, COUNT(*) as count')
            ->whereNotNull('status')
            ->groupBy('status')
            ->orderByDesc('count')
            ->get();

        $byStatus = $byStatusQuery->map(function ($item) {
                return [
                    'label' => ucfirst($item->status ?? 'Unknown'),
                    'count' => $item->count
                ];
            });

        // By user type (from users table)
        $userTypeQuery = \DB::table('users')
            ->join('startups', 'users.id', '=', 'startups.user_id')
            ->select('users.user_type', \DB::raw('COUNT(DISTINCT startups.id) as count'))
            ->groupBy('users.user_type');

        $byUserType = $userTypeQuery->get()->map(function ($item) {
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
            'by_status' => $byStatus,
            'user_types' => [
                'visitor' => $byUserType->firstWhere('label', 'Visitor')['count'] ?? 0,
                'startup' => $byUserType->firstWhere('label', 'Startup')['count'] ?? 0,
                'enabler' => $byUserType->firstWhere('label', 'Enabler')['count'] ?? 0,
            ],
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

        $response = [
            'statistics' => [
                'total' => $total,
                'key' => 'regions',
                'regions' => $regions,
            ]
        ];

        // Determine which filter level to apply
        $filterLevel = null;
        $filterQuery = Startup::query();
        
        if (isset($validated['municipality_code'])) {
            // Municipality level - most specific
            $filterLevel = 'municipality';
            $filterQuery->where('municipality_code', $validated['municipality_code']);
        } elseif (isset($validated['province_code'])) {
            // Province level
            $filterLevel = 'province';
            $filterQuery->where('province_code', $validated['province_code']);
        } elseif (isset($validated['region_code'])) {
            // Region level
            $filterLevel = 'region';
            $filterQuery->where('region_code', $validated['region_code']);
        }

        // If any filter is applied, return the startups
        if ($filterLevel) {
            // Apply sector filter if provided
            if (isset($validated['sector'])) {
                $filterQuery->where(function($q) use ($validated) {
                    $q->where('sectors', 'like', '%"' . $validated['sector'] . '"%')
                      ->orWhere('sectors', 'like', '%' . $validated['sector'] . '%');
                });
            }

            $startups = $filterQuery->with(['region', 'province', 'municipality'])
                ->orderBy('name', 'asc')
                ->limit($validated['per_page'] ?? 100)
                ->get()
                ->map(function ($startup) {
                    // Parse sectors if it's a JSON string
                    $sectors = $startup->sectors;
                    if (is_string($sectors)) {
                        $sectors = json_decode($sectors, true) ?? [];
                    }
                    
                    return [
                        'id' => $startup->id,
                        'startup_number' => $startup->startup_number,
                        'name' => $startup->name,
                        'logo_url' => $startup->logo_url,
                        'sectors' => is_array($sectors) ? $sectors : [],
                        'status' => $startup->status,
                        'development_phase' => $startup->development_phase,
                        'business_classification' => $startup->business_classification,
                        'region_name' => $startup->region->name ?? 'N/A',
                        'province_name' => $startup->province->name ?? 'N/A',
                        'municipality_name' => $startup->municipality->name ?? 'N/A',
                        'address_label' => $startup->address_label,
                        'founding_year' => $startup->founding_year,
                        'founder_name' => $startup->founder_name,
                    ];
                });

            $response['statistics']['startups'] = $startups;
            $response['statistics']['startups_count'] = $startups->count();
            $response['statistics']['filter_level'] = $filterLevel;
        }

        return response()->json($response);
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
