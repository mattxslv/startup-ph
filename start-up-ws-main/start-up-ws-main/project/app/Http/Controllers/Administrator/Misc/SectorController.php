<?php

namespace App\Http\Controllers\Administrator\Misc;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Sectors\Requests\CreateSectorRequest;
use App\Models\Misc\Sectors\Requests\UpdateSectorRequest;
use App\Models\Misc\Sectors\Resources\SectorResources;
use App\Models\Misc\Sectors\Sector;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class SectorController extends Controller
{
    /**
     * List sectors
     *
     * @param Request $request
     * @return SectorResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Sector::FILLABLES))->rules());

        $sectors = PaginationService::paginate(Sector::filter($request->only(Sector::FILTERS)));

        return SectorResources::collection($sectors);
    }

    /**
     * Create Sector
     *
     * @param CreateSectorRequest $request
     * @return SectorResources
     */
    public function store(CreateSectorRequest $request)
    {
        return new SectorResources(Sector::create($request->validated()));
    }

    /**
     * Show sector
     *
     * @param Sector $sector
     * @return SectorResources
     */
    public function show(Sector $sector)
    {
        return new SectorResources($sector);
    }

    /**
     * Update sector
     *
     * @param Sector $sector
     * @param UpdateSectorRequest $request
     * @return SectorResources
     */
    public function update(Sector $sector, UpdateSectorRequest $request)
    {
        $sector->update($request->validated());

        return new SectorResources($sector);
    }

    /**
     * Delete sector
     *
     * @param Sector $sector
     * @return SectorResources
     */
    public function destroy(Sector $sector)
    {
        $sector->delete();

        return new SectorResources($sector);
    }
}
