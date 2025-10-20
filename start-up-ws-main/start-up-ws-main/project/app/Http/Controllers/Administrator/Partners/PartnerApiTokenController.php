<?php

namespace App\Http\Controllers\Administrator\Partners;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Administrators\Requests\UpdateAdministratorRequest;
use App\Models\Partners\ApiTokens\Enums\PartnerApiTokenEnum;
use App\Models\Partners\ApiTokens\PartnerApiToken;
use App\Models\Partners\ApiTokens\Requests\CreatePartnerApiTokenRequest;
use App\Models\Partners\ApiTokens\Requests\UpdatePartnerApiTokenRequest;
use App\Models\Partners\ApiTokens\Resources\PartnerApiTokenResources;
use App\Models\Partners\Partner;
use App\Services\PaginationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PartnerApiTokenController extends Controller
{
    /**
     * List scopes
     *
     * @return JsonResponse
     */
    public function listScopes()
    {
        return response()->json(['data' => array_keys(PartnerApiTokenEnum::ACCESS_SCOPES)]);
    }

    /**
     * List tokens
     *
     * @param Request $request
     * @return PartnerApiTokenResources
     */
    public function index(Request $request, Partner $partner)
    {
        $request->validate((new PaginateRequest(PartnerApiToken::FILLABLES))->rules());

        $tokens = PaginationService::paginate($partner->tokens()->filter($request->only(PartnerApiToken::FILTERS)));

        return PartnerApiTokenResources::collection($tokens);
    }

    /**
     * Create token
     *
     * @param CreatePartnerApiTokenRequest $request
     * @param Partner $partner
     * @return PartnerApiTokenResources
     */
    public function store(CreatePartnerApiTokenRequest $request, Partner $partner)
    {
        return new PartnerApiTokenResources($partner->tokens()->create($request->validated()));
    }

    /**
     * show token
     *
     * @param Partner $partner
     * @param PartnerApiToken $token
     * @return PartnerApiTokenResources
     */
    public function show(Partner $partner, PartnerApiToken $token)
    {
        return new PartnerApiTokenResources($token);
    }

    /**
     * Update token
     *
     * @param UpdateAdministratorRequest $request
     * @param Partner $partner
     * @param PartnerApiToken $token
     * @return PartnerApiTokenResources
     */
    public function update(UpdatePartnerApiTokenRequest $request, Partner $partner, PartnerApiToken $token)
    {
        $token->update($request->validated());

        return new PartnerApiTokenResources($token);
    }

    /**
     * Delete token
     *
     * @param Partner $partner
     * @param PartnerApiToken $token
     * @return PartnerApiTokenResources
     */
    public function destroy(Partner $partner, PartnerApiToken $token)
    {
        $token->delete();

        return new PartnerApiTokenResources($token);
    }
}
