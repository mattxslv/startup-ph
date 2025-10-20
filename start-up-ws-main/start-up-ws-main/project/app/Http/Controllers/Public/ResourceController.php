<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Resources\Resource;
use App\Models\Resources\Resources\ResourceResources;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    /**
     * List publishes resources
     *
     * @param Request $request
     * @return ResourceResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Resource::FILLABLES))->rules());
        $filters = $request->only(Resource::FILTERS);
        $filters['is_published'] = 1;

        $query = Resource::searchQuery(Resource::filterES($filters))->size(10000);

        if (request('q')) {
            $query->sort('_score', 'desc');
        }

        $resources = $query
            ->sort(Resource::getOrderBy(request('order_by') ?? 'publish_date'), (request('status_by') ?? 'desc'))
            ->paginate(request('per_page') ?? 15)
            ->onlyModels();

        return ResourceResources::collection($resources);
    }

    /**
     * Show resource
     *
     * @param Resource $resource
     * @return ResourceResources
     */
    public function show(Resource $resource)
    {
        return new ResourceResources($resource);
    }
}
