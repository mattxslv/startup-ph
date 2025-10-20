<?php

namespace App\Models\Partners;

use App\Models\Partners\ApiTokens\PartnerApiToken;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Partner extends Model
{
    use SoftDeletes;

    public const RESOURCE_KEY = 'partnerss';

    public const FILLABLES = [
        'id',
        'code',
        'name',
        'photo_url',
    ];

    public const FILTERS = [
        'q',
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
                $q->where(self::RESOURCE_KEY . '.name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.code', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Tokens
     *
     * @return MorphMany
     */
    public function tokens(): MorphMany
    {
        return $this->morphMany(PartnerApiToken::class, 'partner');
    }
}
