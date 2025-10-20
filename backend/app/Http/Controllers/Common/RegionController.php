<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Addresses\Regions\Region;
use App\Models\Addresses\Regions\Resources\RegionResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class RegionController extends Controller
{
    /**
     * Region listing
     *
     * @param Request $request
     * @return RegionResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Region::FILLABLES))->rules());

        $regions = PaginationService::paginate(Region::filter($request->only(Region::FILTERS)), 'code', 'asc');

        return RegionResources::collection($regions);
    }
}
