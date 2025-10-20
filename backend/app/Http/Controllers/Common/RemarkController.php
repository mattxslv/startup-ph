<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Remarks\Remark;
use App\Models\Misc\Remarks\Resources\RemarkResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class RemarkController extends Controller
{
    /**
     * List remarks
     *
     * @param Request $request
     * @return RemarkResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Remark::FILLABLES))->rules());

        $remarks = PaginationService::paginate(
            Remark::filter($request->only(Remark::FILTERS))->isActive(),
            'id',
            'asc',
        );

        return RemarkResources::collection($remarks);
    }
}
