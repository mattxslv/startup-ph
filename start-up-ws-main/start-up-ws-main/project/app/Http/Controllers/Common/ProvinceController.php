<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Addresses\Provinces\Province;
use App\Models\Addresses\Provinces\Resources\ProvinceResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    /**
     * Province listing
     *
     * @param Request $request
     * @return ProvinceResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Province::FILLABLES))->rules());

        $provinces = PaginationService::paginate(
            Province::filter($request->only(Province::FILTERS)),
            'code',
            'asc'
        );

        return ProvinceResources::collection($provinces);
    }
}
