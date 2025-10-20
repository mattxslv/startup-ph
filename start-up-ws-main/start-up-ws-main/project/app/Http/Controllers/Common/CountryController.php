<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Addresses\Countries\Country;
use App\Models\Addresses\Countries\Resources\CountryResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Countries listing
     *
     * @param Request $request
     * @return CountryResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Country::FILLABLES))->rules());

        $countries = PaginationService::paginate(
            Country::filter($request->only(Country::FILTERS)),
            'id',
            'asc'
        );

        return CountryResources::collection($countries);
    }
}
