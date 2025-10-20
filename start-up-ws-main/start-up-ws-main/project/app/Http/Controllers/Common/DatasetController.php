<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Misc\Datasets\Dataset;
use App\Models\Misc\Datasets\Resources\DatasetResources;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class DatasetController extends Controller
{
    /**
     * Get dataset by code
     *
     * @param mixed $code
     * @return DatasetResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Dataset::FILLABLES))->rules());

        $datasets = PaginationService::paginate(Dataset::filter($request->only(Dataset::FILTERS)));

        return DatasetResources::collection($datasets);
    }
}
