<?php

namespace App\Http\Controllers\Administrator\Partners;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Partners\Partner;
use App\Models\Partners\Requests\CreatePartnerRequest;
use App\Models\Partners\Requests\UpdatePartnerRequest;
use App\Models\Partners\Resources\PartnerResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    /**
     * List partners
     *
     * @param Request $request
     * @return PartnerResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Partner::FILLABLES))->rules());

        $partners = PaginationService::paginate(
            Partner::filter($request->only(Partner::FILTERS)),
            'name',
            'asc'
        );

        return PartnerResources::collection($partners);
    }

    /**
     * Create partner
     *
     * @param CreatePartnerRequest $request
     * @return PartnerResources
     */
    public function store(CreatePartnerRequest $request)
    {
        return new PartnerResources(Partner::create($request->validated()));
    }

    /**
     * Show partner
     *
     * @param Partner $partner
     * @return PartnerResources
     */
    public function show(Partner $partner)
    {
        return new PartnerResources($partner->load('tokens'));
    }

    /**
     * Update partner
     *
     * @param UpdatePartnerRequest $request
     * @param Partner $partner
     * @return PartnerResources
     */
    public function update(UpdatePartnerRequest $request, Partner $partner)
    {
        $partner->update($request->validated());

        return new PartnerResources($partner);
    }

    /**
     * Delete partner
     *
     * @param Partner $partner
     * @return PartnerResources
     */
    public function destroy(Partner $partner)
    {
        $partner->delete();

        return new PartnerResources($partner);
    }
}
