<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Programs\Program;
use App\Models\Programs\Resources\ProgramResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

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

        $programs = PaginationService::paginate(Program::isPublished()->filter($request->only(Program::FILTERS)));

        return ProgramResources::collection($programs);
    }

    /**
     * Show program
     *
     * @param Program $program
     * @return ProgramResources
     */
    public function show(Program $program)
    {
        return new ProgramResources($program->load('requirements'));
    }
}
