<?php

namespace App\Models\Startups\Traits;

use App\Models\Startups\Startup;

trait WithStartupFilters
{
    /**
     * Undocumented function
     *
     * @param string $orderBy
     * @return string
     */
    public static function getOrderBy(?string $orderBy): string
    {
        if (!$orderBy) {
            $orderBy = '_id';
        }

        if (!in_array($orderBy, Startup::KEYWORDS)) {
            return $orderBy . '.keyword';
        }

        return $orderBy;
    }

    /**
     * Scope filter
     *
     * @param mixed $query
     * @param mixed $filters
     * @return $query
     */
    public function scopeFilter($query, $filters)
    {
        if (isset($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }

        if (isset($filters['application_type'])) {
            $query->where('application_type', $filters['application_type']);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        if (isset($filters['is_application_completed'])) {
            $query->where('is_application_completed', $filters['is_application_completed']);
        }

        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere('organization', 'like', '%' . $filters['q'] . '%')
                    ->orWhere('description', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Filter ES
     *
     * @param array $filters
     * @return array
     */
    public static function filterES(array $filters)
    {
        $query = ['bool' => ['must' => []]];

        if (isset($filters['user_id'])) {
            array_push($query['bool']['must'], ['term' => ['user_id' => $filters['user_id']]]);
        }

        if (isset($filters['sector'])) {
            array_push($query['bool']['must'], ['term' => ['sectors.keyword' => $filters['sector']]]);
        }

        if (isset($filters['development_phase'])) {
            array_push($query['bool']['must'], ['term' => ['development_phase.keyword' => $filters['development_phase']]]);
        }

        if (isset($filters['status'])) {
            array_push($query['bool']['must'], ['term' => ['status' => $filters['status']]]);
        }

        if (isset($filters['is_verified'])) {
            array_push($query['bool']['must'], ['term' => ['is_verified' => $filters['is_verified']]]);
        }

        if (isset($filters['region_code'])) {
            array_push($query['bool']['must'], ['term' => ['region_code.keyword' => $filters['region_code']]]);
        }

        if (isset($filters['province_code'])) {
            array_push($query['bool']['must'], ['term' => ['province_code.keyword' => $filters['province_code']]]);
        }

        if (isset($filters['municipality_code'])) {
            array_push($query['bool']['must'], ['term' => ['municipality_code.keyword' => $filters['municipality_code']]]);
        }

        if (isset($filters['barangay_code'])) {
            array_push($query['bool']['must'], ['term' => ['barangay_code.keyword' => $filters['barangay_code']]]);
        }

        if (isset($filters['q'])) {
            array_push($query['bool']['must'], [
                'bool' => ['should' => [
                    ['multi_match' => [
                        'query' => $filters['q'],
                        'fields' => ['name'],
                        'fuzziness' => 'auto'
                    ]],
                    ['term' => ['startup_number' => $filters['q']]],
                ]]
            ]);
        }

        return $query;
    }

    /**
     * Format ES data
     *
     * @return array
     */
    protected function formatEsData(): array
    {
        $array = $this->toArray();

        $array['created_at'] = $this->created_at->format('Y-m-d H:i:s');
        $array['updated_at'] = $this->updated_at->format('Y-m-d H:i:s');

        return $array;
    }
}
