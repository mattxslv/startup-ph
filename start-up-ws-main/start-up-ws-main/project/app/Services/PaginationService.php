<?php

namespace App\Services;

use Illuminate\Contracts\Database\Eloquent\Builder;

class PaginationService
{
    /**
     * Paginate resources
     *
     * @param Builder $builder
     * @return Collection
     */
    public static function paginate(Builder $builder, $orderBy = 'id', $sortBy = 'desc')
    {
        $query = $builder->orderBy(request('order_by') ?? $orderBy, request('status_by') ?? $sortBy);

        return request('paginate', 1) == 0 ?
            $query->get() :
            $query->paginate(request('per_page', 15));
    }
}
