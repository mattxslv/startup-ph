<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Models\Testimonials\Requests\CreateTestimonialRequest;
use App\Models\Testimonials\Requests\UpdateTestimonialRequest;
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
    public function index(Request $request)
    {
        $request->validate((new PaginateRequest(Testimonial::FILLABLES))->rules());

        $testimonials = PaginationService::paginate(Testimonial::filter($request->only(Testimonial::FILTERS)));

        return TestimonialResources::collection($testimonials);
    }

    /**
     * Create testimonial
     *
     * @param CreateTestimonialRequest $request
     * @return TestimonialResources
     */
    public function store(CreateTestimonialRequest $request)
    {
        return new TestimonialResources(Testimonial::create($request->validated()));
    }

    /**
     * Show testimonial
     *
     * @param Testimonial $testimonial
     * @return TestimonialResources
     */
    public function show(Testimonial $testimonial)
    {
        return new TestimonialResources($testimonial);
    }

    /**
     * Update testimonial
     *
     * @param UpdateTestimonialRequest $request
     * @param Testimonial $testimonial
     * @return TestimonialResources
     */
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        $testimonial->update($request->validated());

        return new TestimonialResources($testimonial);
    }

    /**
     * Delete testimonial
     *
     * @param Testimonial $testimonial
     * @return TestimonialResources
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return new TestimonialResources($testimonial);
    }
}
