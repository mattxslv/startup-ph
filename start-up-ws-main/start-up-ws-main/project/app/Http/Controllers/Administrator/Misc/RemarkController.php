<?php

namespace App\Http\Controllers\Administrator\Misc;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Remarks\Remark;
use App\Models\Misc\Remarks\Requests\CreateRemarkRequest;
use App\Models\Misc\Remarks\Requests\UpdateRemarkRequest;
use App\Models\Misc\Remarks\Resources\RemarkResources;
use App\Models\Misc\Requirements\Requests\CreateRequirementRequest;
use App\Models\Misc\Requirements\Requests\UpdateRequirementRequest;
use App\Models\Misc\Requirements\Requirement;
use App\Models\Misc\Requirements\Resources\RequirementResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class RemarkController extends Controller
{
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Remark::FILLABLES))->rules());

        $remarks = PaginationService::paginate(Remark::filter($request->only(Remark::FILTERS)));

        return RemarkResources::collection($remarks);
    }

    public function store(CreateRemarkRequest $request)
    {
        return new RemarkResources(Remark::create($request->validated()));
    }

    public function show(Remark $remark)
    {
        return new RemarkResources($remark);
    }

    public function update(Remark $remark, UpdateRemarkRequest $request)
    {
        $remark->update($request->validated());

        return new RemarkResources($remark);
    }

    public function destroy(Remark $remark)
    {
        $remark->delete();

        return new RemarkResources($remark);
    }
}
