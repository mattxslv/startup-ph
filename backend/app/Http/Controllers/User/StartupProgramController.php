<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Programs\Program;
use App\Models\Programs\Resources\ProgramResources;
use App\Models\Programs\Resources\UserAvailableProgramResources;
use App\Models\Users\User;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class StartupProgramController extends Controller
{
    /**
     * List startup programs
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Program::FILLABLES))->rules());

        $startup = User::authenticated()->getStartup();

        $programs = PaginationService::paginate($startup->programs()->filter($request->only(Program::FILTERS)));

        return ProgramResources::collection($programs);
    }

    /**
     * Available programs
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function availablePrograms(Request $request)
    {
        $request->validate((new PaginateRequest(Program::FILLABLES))->rules());

        $programs = PaginationService::paginate(Program::isPublished()->filter($request->only(Program::FILTERS)));

        return UserAvailableProgramResources::collection($programs->load('requirements'));
    }

    /**
     * Show available program
     *
     * @param Program $program
     * @return UserAvailableProgramResources
     */
    public function showAvailablePrograms(Program $program)
    {
        return new UserAvailableProgramResources($program->load('requirements'));
    }
}
