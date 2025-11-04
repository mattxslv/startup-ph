<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RegionalFocalFilter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $admin = Auth::guard('administrator')->user();

        // If admin is a regional focal point, add region filter to request
        if ($admin && $admin->is_regional_focal && $admin->region_code) {
            // Merge region_code into request parameters
            $request->merge([
                'region_code' => $admin->region_code,
                '_is_regional_focal' => true
            ]);
        }

        return $next($request);
    }
}
