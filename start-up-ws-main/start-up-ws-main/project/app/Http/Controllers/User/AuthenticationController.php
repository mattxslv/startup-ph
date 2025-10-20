<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Administrators\Resources\AdministratorResources;
use App\Models\Users\Requests\AuthenticateUserRequest;
use App\Models\Users\Resources\UserResources;
use App\Models\Users\Services\UserAuthenticationService;
use Illuminate\Http\JsonResponse;

class AuthenticationController extends Controller
{
    /**
     * @var UserAuthenticationService $authService
     */
    private $authService;

    /**
     * AuthenticationController constructor
     *
     * @param UserAuthenticationService $authService
     */
    public function __construct(UserAuthenticationService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Aduthenticate
     *
     * @param AuthenticateUserRequest $request
     * @return JsonResponse
     */
    public function authenticate(AuthenticateUserRequest $request)
    {
        $token = $this->authService
            ->checkCredentials($request->validated())
            ->authenticate();

        return response()->json(['token' => $token]);
    }

    /**
     * Logout
     *
     * @return AdministratorResources
     */
    public function logout()
    {
        (auth()->user())->currentAccessToken()->delete();

        return new UserResources(auth()->user());
    }
}
