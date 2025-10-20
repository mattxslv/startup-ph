<?php

namespace App\Http\Middleware;

use App\Models\Partners\ApiTokens\Enums\PartnerApiTokenEnum;
use App\Models\Partners\Partner;
use Closure;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class PartnerAuthenticate
{
    public function handle($request, Closure $next, $role = null)
    {
        if ($request->header('X-Secret-Code') && $request->header('X-Secret-Token')) {
            $partner = Partner::Where('code', $request->header('X-Secret-Code'))->first();

            if ($partner) {
                if ($token = $partner->tokens()->where('secret', $request->header('X-Secret-Token'))->first()) {
                    if (!$role || in_array($role, $token->scope)) {
                        if ($role == PartnerApiTokenEnum::ACCESS_SCOPES['SSO_AUTHENTICATION']) {
                            // TODO: Handle sso authentication here
                        }

                        // TODO: Log access here
                        $token->update(['last_used' => date('Y-m-d H:i:s')]);

                        return $next($request);
                    }
                }
            }
        }

        throw new AccessDeniedHttpException();
    }
}
