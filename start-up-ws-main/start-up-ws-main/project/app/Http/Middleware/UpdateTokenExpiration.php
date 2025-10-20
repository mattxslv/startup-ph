<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UpdateTokenExpiration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard('sanctum')->check() && config('auth.session_timeout')) {
            $token = Auth::guard('sanctum')->user()->currentAccessToken();
            $token->forceFill([
                'expires_at' => now()->addMinutes(config('auth.session_timeout'))
            ])->save();
        }

        return $next($request);
    }
}
