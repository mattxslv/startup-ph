<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Startups\Enums\StartupEnum;
use App\Models\Startups\Resources\PublicStartupResources;
use App\Models\Startups\Startup;
use Illuminate\Http\Request;

class StartupController extends Controller
{
    /**
     * List startups
     *
     * @param Request $request
     * @return PublicStartupResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Startup::FILLABLES))->rules());

        $filters = $request->only(Startup::FILTERS);
        $filters['status'] = StartupEnum::STATUS['VERIFIED'];

        $query = Startup::searchQuery(Startup::filterES($filters))->size(10000);

        if (request('q')) {
            $query->sort('_score', 'desc');
        }

        $startups = $query
            ->sort(Startup::getOrderBy(request('order_by')), (request('status_by') ?? 'desc'))
            ->paginate(request('per_page') ?? 15)
            ->onlyModels();

        return PublicStartupResources::collection($startups);
    }

    /**
     * Show startup
     *
     * @param mixed $slug
     * @return PublicStartupResources
     */
    public function show($slug)
    {
        $startup = Startup::getBySlug($slug);

        return new PublicStartupResources($startup);
    }
}
