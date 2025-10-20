<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Sectors\Resources\SectorResources;
use App\Models\Misc\Sectors\Sector;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    /**
     * Sectors listing
     *
     * @param Request $request
     * @return SectorResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Sector::FILLABLES))->rules());

        $sectors = PaginationService::paginate(
            Sector::filter($request->only(Sector::FILTERS))->where('is_active', 1),
            'name',
            'asc'
        );

        return SectorResources::collection($sectors);
    }
}
