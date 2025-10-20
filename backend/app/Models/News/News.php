<?php

namespace App\Models\News;

use ElasticScoutDriverPlus\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class News extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;
    use Searchable;

    public const RESOURCE_KEY = 'news';

    public const FILLABLES = [
        'agency',
        'title',
        'sub_title',
        'publish_date',
        'publish_by',
        'thumbnail_url',
        'body',
        'tags',
        'is_published',
        'published_at',
        'posted_by_id',
    ];

    public const FILTERS = [
        'agency',
        'publish_date',
        'tag',
        'tags',
        'is_published',
        'q',
    ];

    public const KEYWORDS = [
        'id',
        '_id',
        'posted_by_id',
        'publish_date',
        'published_at',
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = self::FILLABLES;

    protected $casts = [
        'body' => 'array',
        'tags' => 'array',
    ];

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
        $array = $this->toArray();

        $array['created_at'] = $this->created_at->format('Y-m-d H:i:s');
        $array['updated_at'] = $this->updated_at->format('Y-m-d H:i:s');

        unset($array['body']);

        return $array;
    }

    public function scopeFilter($query, $filters)
    {
        if (isset($filters['agency'])) {
            $query->where('agency', $filters['agency']);
        }

        if (isset($filters['is_active'])) {
            $query->where(self::RESOURCE_KEY . '.is_active', $filters['is_active']);
        }

        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where(self::RESOURCE_KEY . '.title', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.sub_title', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

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

        if (!in_array($orderBy, News::KEYWORDS)) {
            return $orderBy . '.keyword';
        }

        return $orderBy;
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

        if (isset($filters['agency'])) {
            array_push($query['bool']['must'], ['term' => ['agency.keyword' => $filters['agency']]]);
        }

        if (isset($filters['is_published'])) {
            array_push($query['bool']['must'], ['term' => ['is_published' => $filters['is_published']]]);
        }

        if (isset($filters['publish_date'])) {
            array_push($query['bool']['must'], ['term' => ['publish_date' => $filters['publish_date']]]);
        }

        if (isset($filters['tag'])) {
            array_push($query['bool']['must'], ['term' => ['tags.keyword' => $filters['tag']]]);
        }

        if (isset($filters['tags']) && is_array($filters['tags'])) {
            array_push($query['bool']['must'], ['terms' => ['tags.keyword' => $filters['tags']]]);
        }

        if (isset($filters['posted_by_id'])) {
            array_push($query['bool']['must'], ['term' => ['posted_by_id' => $filters['posted_by_id']]]);
        }

        if (isset($filters['q'])) {
            array_push($query['bool']['must'], [
                'bool' => ['should' => [
                    ['multi_match' => [
                        'query' => $filters['q'],
                        'fields' => ['title', 'sub_title'],
                        'fuzziness' => 3
                    ]],
                ]]
            ]);
        }

        return $query;
    }
}
