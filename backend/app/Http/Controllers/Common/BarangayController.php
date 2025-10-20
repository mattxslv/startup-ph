<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Addresses\Barangays\Barangay;
use App\Models\Addresses\Barangays\Resources\BarangayResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class BarangayController extends Controller
{
    /**
     * Province listing
     *
     * @param Request $request
     * @return BarangayResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Barangay::FILLABLES))->rules());

        $barangays = PaginationService::paginate(Barangay::filter($request->only(Barangay::FILTERS)), 'code', 'asc');

        return BarangayResources::collection($barangays);
    }
}
