<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Users\Resources\UserResources;
use App\Models\Users\User;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * List users
     *
     * @param Request $request
     * @return UserResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(User::FILLABLES))->rules());

        $users = PaginationService::paginate(
            User::filter($request->only(User::FILTERS)),
            'first_name',
            'asc'
        );

        return UserResources::collection($users);
    }

    /**
     * Show user
     *
     * @param User $user
     * @return UserResources
     */
    public function show(User $user)
    {
        return new UserResources($user->load('startups'));
    }
}
