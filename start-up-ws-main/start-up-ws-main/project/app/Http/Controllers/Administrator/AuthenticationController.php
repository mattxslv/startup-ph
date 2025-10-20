<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Models\Administrators\Administrator;
use App\Models\Administrators\Requests\AuthenticateAdministratorRequest;
use App\Models\Administrators\Requests\ChangePasswordAdministratorRequest;
use App\Models\Administrators\Requests\TwoFactorAuthenticateRequest;
use App\Models\Administrators\Resources\AdministratorProfileResources;
use App\Models\Administrators\Resources\AdministratorResources;
use App\Models\Administrators\Services\AdministratorAuthenticationService;
use Illuminate\Http\JsonResponse;

class AuthenticationController extends Controller
{
    /**
     * @var AdministratorAuthenticationService $authService
     */
    private $authService;

    public function __construct(AdministratorAuthenticationService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Aduthenticate
     *
     * @param AuthenticateAdministratorRequest $request
     * @return JsonResponse
     */
    public function authenticate(AuthenticateAdministratorRequest $request)
    {
        $token = $this->authService
            ->checkEmail($request->get('email'))
            ->checkPassword($request->get('password'))
            ->checkSecondaryValidation()
            ->authenticate();

        return response()->json(['token' => $token]);
    }

    /**
     * Two factor authenticate
     *
     * @param TwoFactorAuthenticateRequest $request
     * @return JsonResponse
     */
    public function twoFactorAuthenticate(TwoFactorAuthenticateRequest $request)
    {
        $token = $this->authService
            ->validateAuthToken($request->get('auth_token'))
            ->validatePin($request->get('pin'))
            ->twoFactorAuthenticate();

        return response()->json(['token' => $token]);
    }

    /**
     * Show profile
     *
     * @return AdministratorResources
     */
    public function showProfile()
    {
        return new AdministratorProfileResources(Administrator::authenticated());
    }

    /**
     * Change password
     *
     * @param ChangePasswordAdministratorRequest $request
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordAdministratorRequest $request)
    {
        $token = (new AdministratorAuthenticationService(auth()->user()))
            ->checkPassword($request->get('current_password'))
            ->updatePassword($request->get('password'))
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

        return new AdministratorResources(auth()->user());
    }
}
