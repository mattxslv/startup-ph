<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Testimonials\Resources\TestimonialResources;
use App\Models\Testimonials\Testimonial;
use App\Services\PaginationService;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * List testimonials
     *
     * @param Request $request
     * @return TestimonialResources
     */
    public function __invoke(Request $request)
    {
        $request->validate((new PaginateRequest(Testimonial::FILLABLES))->rules());

        $testimonials = PaginationService::paginate(Testimonial::filter($request->only(Testimonial::FILTERS))->where('is_active', 1));

        return TestimonialResources::collection($testimonials);
    }
}
