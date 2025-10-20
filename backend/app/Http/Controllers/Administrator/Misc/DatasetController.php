<?php

namespace App\Http\Controllers\Administrator\Misc;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Datasets\Dataset;
use App\Models\Misc\Datasets\Requests\CreateDatasetRequest;
use App\Models\Misc\Datasets\Requests\UpdateDatasetRequest;
use App\Models\Misc\Datasets\Resources\DatasetResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class DatasetController extends Controller
{
    /**
     * List dataset
     *
     * @param Request $request
     * @return DatasetResources
     */
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Dataset::FILLABLES))->rules());

        $datasets = PaginationService::paginate(Dataset::filter($request->only(Dataset::FILTERS)));

        return DatasetResources::collection($datasets);
    }

    /**
     * Create dataset
     *
     * @param CreateDatasetRequest $request
     * @return DatasetResources
     */
    public function store(CreateDatasetRequest $request)
    {
        return new DatasetResources(Dataset::create($request->validated()));
    }

    /**
     * Show dataset
     *
     * @param Dataset $dataset
     * @return DatasetResources
     */
    public function show(Dataset $dataset)
    {
        return new DatasetResources($dataset);
    }

    /**
     * Update dataset
     *
     * @param UpdateDatasetRequest $request
     * @param Dataset $dataset
     * @return DatasetResources
     */
    public function update(UpdateDatasetRequest $request, Dataset $dataset)
    {
        $dataset->update($request->validated());

        return new DatasetResources($dataset);
    }

    /**
     * Delete dataset
     *
     * @param Dataset $dataset
     * @return DatasetResources
     */
    public function destroy(Dataset $dataset)
    {
        $dataset->delete();

        return new DatasetResources($dataset);
    }
}
