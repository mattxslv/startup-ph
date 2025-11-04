<?php

namespace Dmn\PhAddress\Http\Controllers;

use Dmn\PhAddress\Http\Controllers\Controller;
use Dmn\PhAddress\Http\Resources\Country as ResourcesCountry;
use Dmn\PhAddress\Models\Country;
use Illuminate\Http\Resources\Json\JsonResource;

class CountryController extends Controller
{
    /**
     * List
     *
     * @return JsonResource
     */
    public function index(): JsonResource
    {
        $q = $this->getQuery();

        $regions = Country::name($q)
            ->paginate($this->getPerPage());

        return ResourcesCountry::collection($regions);
    }
}
