<?php

namespace Dmn\PhAddress\Http\Controllers;

use Dmn\PhAddress\Http\Controllers\Controller;
use Dmn\PhAddress\Http\Resources\Province;
use Dmn\PhAddress\Http\Resources\Region as ResourcesRegion;
use Dmn\PhAddress\Models\Region;
use Illuminate\Http\Resources\Json\JsonResource;

class RegionController extends Controller
{
    /**
     * List
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        $q = $this->getQuery();

        $regions = Region::name($q)
            ->paginate($this->getPerPage());

        return ResourcesRegion::collection($regions);
    }

    /**
     * Provinces
     *
     * @param string $regionCode
     *
     * @return JsonResource
     */
    public function province(string $regionCode): JsonResource
    {
        $q = $this->getQuery();

        $provinces = Region::findOrFail($regionCode)
            ->provinces()
            ->name($q)
            ->paginate($this->getPerPage());
        
        return Province::collection($provinces);
    }
}
