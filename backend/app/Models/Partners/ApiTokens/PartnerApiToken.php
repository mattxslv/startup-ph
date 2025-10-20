<?php

namespace App\Models\Partners\ApiTokens;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class PartnerApiToken extends Authenticatable
{
    use HasApiTokens;
    use SoftDeletes;

    public const RESOURCE_KEY = 'partner_api_tokens';

    public const FILLABLES = [
        'id',
        'partner_id',
        'name',
        'secret',
        'scope',
        'last_used',
    ];

    public const FILTERS = [
        'q',
    ];

    protected $casts = [
        'scope' => 'array'
    ];

    protected $fillable = self::FILLABLES;

    /**
     * Scope filter
     *
     * @param mixed $query
     * @param mixed $filters
     * @return $query
     */
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }
}
