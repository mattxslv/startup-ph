<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Concerns\Concern;
use App\Models\Concerns\Requests\CreateConcernRequest;
use App\Models\Concerns\Resources\ConcernResources;

class ContactUsController extends Controller
{
    /**
     * Send concern
     *
     * @param CreateConcernRequest $request
     * @return ConcernResources
     */
    public function __invoke(CreateConcernRequest $request)
    {
        $concern = Concern::create($request->validated());

        $concern->sendEmail();

        return new ConcernResources($concern->fresh());
    }
}
