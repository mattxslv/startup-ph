<?php

namespace App\Models\Audits;

use Carbon\Carbon;
use ElasticScoutDriverPlus\Searchable;
use OwenIt\Auditing\Models\Audit as ModelsAudit;

class Audit extends ModelsAudit
{
    use Searchable;

    public const RESOURCE_KEY = 'audits';

    public const FILTERS = [
        'user_type',
        'user_id',
        'event',
        'auditable_type',
        'auditable_id',
    ];

    public $timestamps = false;

    /**
     * Get the name of the index associated with the model.
     *
     * @return string
     */
    public function searchableAs()
    {
        return config('elastic.migrations.index_name_prefix') . self::RESOURCE_KEY;
    }

     /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $data = $this->toArray();

        $data['old_values'] = json_encode($this->old_values);
        $data['new_values'] = json_encode($this->new_values);
        $data['created_at'] = (new Carbon())->format('Y-m-d H:i:s');

        return $data;
    }

    /**
      * Filter ES
      *
      * @param array $filters
      * @return array
      */
    public static function filterES(array $filters): array
    {
        $query = ['bool' => ['must' => []]];

        if (isset($filters['user_type'])) {
            array_push($query['bool']['must'], ['term' => ['user_type' => $filters['user_type']]]);
        }

        if (isset($filters['user_id'])) {
            array_push($query['bool']['must'], ['term' => ['user_id' => $filters['user_id']]]);
        }

        if (isset($filters['event'])) {
            array_push($query['bool']['must'], ['term' => ['event' => $filters['event']]]);
        }

        if (isset($filters['auditable_type'])) {
            array_push($query['bool']['must'], ['term' => ['auditable_type' => $filters['auditable_type']]]);
        }

        if (isset($filters['auditable_id'])) {
            array_push($query['bool']['must'], ['term' => ['auditable_id' => $filters['auditable_id']]]);
        }

        return $query;
    }
}
