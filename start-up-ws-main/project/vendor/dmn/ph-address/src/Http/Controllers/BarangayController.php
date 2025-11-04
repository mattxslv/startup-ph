<?php

namespace Dmn\PhAddress\Http\Controllers;

use Dmn\PhAddress\Http\Controllers\Controller;
use Dmn\PhAddress\Http\Resources\Barangay as ResourcesBarangay;
use Dmn\PhAddress\Models\Barangay;
use Illuminate\Http\Resources\Json\JsonResource;

class BarangayController extends Controller
{
    /**
     * List
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        $q = $this->getQuery();

        $regions = Barangay::name($q)
            ->paginate($this->getPerPage());

        return ResourcesBarangay::collection($regions);
    }
}
