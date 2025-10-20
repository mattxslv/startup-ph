<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Users\Requests\EGovSSOByExchangeCodeRequest;
use App\Models\Users\Services\UserAuthenticationService;
use App\Services\EgovAppService;

class EGovSSOAuthController extends Controller
{
    /**
     * @var EgovAppService $egovService
     */
    private $egovService;

    /**
     * EGovSSOAuthController constructor
     *
     * @param EgovAppService $egovService
     */
    public function __construct(EgovAppService $egovService)
    {
        $this->egovService = $egovService;
    }

    /**
     * SSO auth by exchange code
     *
     * @param EGovSSOByExchangeCodeRequest $request
     * @return JsonResponse
     */
    public function ssoAuthByExchangeCode(EGovSSOByExchangeCodeRequest $request)
    {
        $user = $this->egovService->ssoAuthenticate($request->get('exchange_code'));

        $token = (new UserAuthenticationService($user))->authenticate();

        return response()->json(['token' => $token]);
    }
}
