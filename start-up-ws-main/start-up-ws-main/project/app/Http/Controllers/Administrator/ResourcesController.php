<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Administrators\Administrator;
use App\Models\Resources\Requests\CreateResourceRequest;
use App\Models\Resources\Requests\UpdateResourceRequest;
use App\Models\Resources\Resource;
use App\Models\Resources\Resources\ResourceResources;
use Illuminate\Http\Request;

class ResourcesController extends Controller
{
    /**
     * List resources
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Resource::FILLABLES))->rules());

        $filters = $request->only(Resource::FILTERS);

        if (Administrator::authenticated()->agency != 'DICT') {
            $filters['agency'] = Administrator::authenticated()->agency;
        }

        $query = Resource::searchQuery(Resource::filterES($filters))->size(10000);

        if (request('q')) {
            $query->sort('_score', 'desc');
        }

        $resources = $query
            ->sort(Resource::getOrderBy(request('order_by')), (request('status_by') ?? 'desc'))
            ->paginate(request('per_page') ?? 15)
            ->onlyModels();

        return ResourceResources::collection($resources);
    }

    /**
     * Create resource
     *
     * @param CreateResourceRequest $request
     * @return ResourceResources
     */
    public function store(CreateResourceRequest $request)
    {
        return new ResourceResources(Administrator::authenticated()->createResources($request->validated()));
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

    /**
     * Update resource
     *
     * @param UpdateResourceRequest $request
     * @param Resource $resource
     * @return ResourceResources
     */
    public function update(UpdateResourceRequest $request, Resource $resource)
    {
        $resource->update($request->validated());

        return new ResourceResources($resource);
    }

    /**
     * Delete resource
     *
     * @param Resource $resource
     * @return ResourceResources
     */
    public function destroy(Resource $resource)
    {
        $resource->delete();

        return new ResourceResources($resource);
    }

    /**
     * Toggle publish status
     *
     * @param Resource $resource
     * @return ResourceResources
     */
    public function togglePublishedStatus(Resource $resource)
    {
        $resource->update([
            'is_published' => intval(!$resource->is_published),
            'published_at' => $resource->is_published ? null : date('Y-m-d H:i:s'),
        ]);

        return new ResourceResources($resource);
    }
}
