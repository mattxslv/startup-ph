<?php

namespace Dmn\PhAddress\Http\Controllers;

use Dmn\PhAddress\Http\Controllers\Controller;
use Dmn\PhAddress\Http\Resources\Barangay;
use Dmn\PhAddress\Http\Resources\SubMunicipality as ResourcesSubMunicipality;
use Dmn\PhAddress\Models\SubMunicipality;
use Illuminate\Http\Resources\Json\JsonResource;

class SubMunicipalityController extends Controller
{
    /**
     * List
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        $q = $this->getQuery();

        $regions = SubMunicipality::name($q)
            ->paginate($this->getPerPage());

        return ResourcesSubMunicipality::collection($regions);
    }

    /**
     * Barangays
     *
     * @param string $subMunicipalityCode
     *
     * @return JsonResource
     */
    public function barangay(string $subMunicipalityCode): JsonResource
    {
        $q = $this->getQuery();

        $barangays = SubMunicipality::findOrFail($subMunicipalityCode)
            ->barangays()
            ->name($q)
            ->paginate($this->getPerPage());

        return Barangay::collection($barangays);
    }
}
