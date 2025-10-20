<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Concerns\Concern;
use App\Models\Concerns\Resources\ConcernResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class ConcernController extends Controller
{
    /**
     * List concerns
     *
     * @param Request $request
     * @return ConcernResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Concern::FILLABLES))->rules());

        $startups = PaginationService::paginate(Concern::filter($request->only(Concern::FILTERS)));

        return ConcernResources::collection($startups);
    }
}
