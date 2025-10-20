<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Addresses\Municipalities\Municipality;
use App\Models\Addresses\Municipalities\Resources\MunicipalityResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class MunicipalityController extends Controller
{
    /**
     * Province listing
     *
     * @param Request $request
     * @return MunicipalityResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Municipality::FILLABLES))->rules());

        $municipalities = PaginationService::paginate(Municipality::filter($request->only(Municipality::FILTERS)), 'code', 'asc');

        return MunicipalityResources::collection($municipalities);
    }
}
