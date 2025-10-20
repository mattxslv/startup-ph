<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Requirements\Requirement;
use App\Models\Misc\Requirements\Resources\RequirementResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class RequirementController extends Controller
{
    /**
     * Requirements listing
     *
     * @param Request $request
     * @return RequirementResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Requirement::FILLABLES))->rules());

        $requirements = PaginationService::paginate(
            Requirement::filter($request->only(Requirement::FILTERS))->where('is_active', 1),
            'id',
            'asc',
        );

        return RequirementResources::collection($requirements);
    }
}
