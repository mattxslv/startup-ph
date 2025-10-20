<?php

namespace App\Http\Controllers\Administrator\Misc;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\AssessmentTags\AssessmentTag;
use App\Models\Misc\AssessmentTags\Requests\CreateAssessmentTagRequest;
use App\Models\Misc\AssessmentTags\Requests\UpdateAssessmentTagRequest;
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
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(AssessmentTag::FILLABLES))->rules());

        $assessmentTags = PaginationService::paginate(AssessmentTag::filter($request->only(AssessmentTag::FILTERS)));

        return AssessmentTagResources::collection($assessmentTags);
    }

    /**
     * Create assessment tag
     *
     * @param CreateAssessmentTagRequest $request
     * @return AssessmentTagResources
     */
    public function store(CreateAssessmentTagRequest $request)
    {
        return new AssessmentTagResources(AssessmentTag::create($request->validated()));
    }

    /**
     * Show assessment tag
     *
     * @param AssessmentTag $assessmentTag
     * @return AssessmentTagResources
     */
    public function show(AssessmentTag $assessmentTag)
    {
        return new AssessmentTagResources($assessmentTag);
    }

    /**
     * Update assessment tag
     *
     * @param UpdateAssessmentTagRequest $request
     * @param AssessmentTag $assessmentTag
     * @return AssessmentTagResources
     */
    public function update(UpdateAssessmentTagRequest $request, AssessmentTag $assessmentTag)
    {
        $assessmentTag->update($request->validated());

        return new AssessmentTagResources($assessmentTag);
    }
}
