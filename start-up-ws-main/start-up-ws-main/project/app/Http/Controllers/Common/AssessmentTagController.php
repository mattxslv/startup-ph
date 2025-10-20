<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\AssessmentTags\AssessmentTag;
use App\Models\Misc\AssessmentTags\Resources\AssessmentTagResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class AssessmentTagController extends Controller
{
    /**
     * List assessment tags
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(AssessmentTag::FILLABLES))->rules());

        $assessmentTags = PaginationService::paginate(
            AssessmentTag::isActive()->filter($request->only(AssessmentTag::FILTERS)),
            sortBy: 'asc'
        );

        return AssessmentTagResources::collection($assessmentTags);
    }
}
