<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Audits\Audit;
use App\Models\Audits\Resources\AuditResources;
use Illuminate\Http\Request;

class AuditController extends Controller
{
    /**
     * List audits
     *
     * @param Request $request
     * @return AuditResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest())->rules());

        $audits = Audit::searchQuery(Audit::filterES($request->only(Audit::FILTERS)))
            ->size(10000)
            ->sort('created_at', 'desc')
            ->paginate(request('per_page') ?? 15)
            ->onlyDocuments();

        return AuditResources::collection($audits);
    }
}
