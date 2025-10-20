<?php

namespace App\Http\Controllers\Administrator\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Administrators\Administrator;
use App\Models\Programs\Program;
use App\Models\Programs\Requests\CreateProgramRequest;
use App\Models\Programs\Requests\SyncProgramRequirementRequest;
use App\Models\Programs\Requests\UpdateProgramRequest;
use App\Models\Programs\Resources\ProgramResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProgramController extends Controller
{
    /**
     * List programs
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Program::FILLABLES))->rules());

        $filters = $request->only(Program::FILTERS);

        if (Administrator::authenticated()->agency != 'DICT') {
            $filters['agency'] = Administrator::authenticated()->agency;
        }

        $programs = PaginationService::paginate(Program::filter($filters));

        return ProgramResources::collection($programs);
    }

    /**
     * Create program
     *
     * @param CreateProgramRequest $request
     * @return ProgramResources
     */
    public function store(CreateProgramRequest $request)
    {
        return new ProgramResources(Program::create($request->validated()));
    }

    /**
     * Show program
     *
     * @param Program $program
     * @return ProgramResources
     */
    public function show(Program $program)
    {
        // return new ProgramResources($program->load('requirements', 'applications.startup'));
        return new ProgramResources($program->load('requirements'));
    }

    /**
     * Update program
     *
     * @param UpdateProgramRequest $request
     * @param Program $program
     * @return ProgramResources
     */
    public function update(UpdateProgramRequest $request, Program $program)
    {
        $program->update($request->validated());

        return new ProgramResources($program);
    }

    /**
     * Delete program
     *
     * @param Program $program
     * @return ProgramResources
     */
    public function destroy(Program $program)
    {
        $program->delete();

        return new ProgramResources($program);
    }

    /**
     * Sync requirements
     *
     * @param SyncProgramRequirementRequest $request
     * @param Program $program
     * @return ProgramResources
     */
    public function syncRequirements(SyncProgramRequirementRequest $request, Program $program)
    {
        $program->syncRequirements($request->get('requirements'));

        return new ProgramResources($program->load('requirements'));
    }

    /**
     * Toggle publish
     *
     * @param Program $program
     * @return JsonResource
     */
    public function togglePublish(Program $program): JsonResource
    {
        $program->togglePublish();

        return new ProgramResources($program);
    }
}
