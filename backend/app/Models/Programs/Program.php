<?php

namespace App\Models\Programs;

use App\Models\Applications\Application;
use App\Models\Programs\Traits\ProgramHasRequirements;
use App\Models\Startups\Startup;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Program extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;
    use ProgramHasRequirements;

    public const RESOURCE_KEY = 'programs';

    public const FILLABLES = [
        'agency',
        'name',
        'thumbnail_url',
        'banner_url',
        'type',
        'date_start',
        'date_end',
        'description',
        'content',
        'is_verified_required',
        'is_published',
    ];

    protected $casts = [
        'content' => 'array'
    ];

    public const FILTERS = [
        'agency',
        'type',
        'is_published',
        'q',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
        if (isset($filters['agency'])) {
            $query->where('agency', $filters['agency']);
        }

        if (isset($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        if (isset($filters['is_ublished'])) {
            $query->where('is_ublished', $filters['is_ublished']);
        }

        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere('description', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Scope is published
     *
     * @param mixed $query
     * @param mixed $filters
     * @return $query
     */
    public function scopeIsPublished($query)
    {
        $query->where('is_published', 1);

        return $query;
    }

    /**
    * Applications
    *
    * @return HasMany
    */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'program_id');
    }

    /**
     * Startups
     *
     * @return BelongsToMany
     */
    public function startups(): BelongsToMany
    {
        return $this->belongsToMany(
            Startup::class,
            'applications',
            'program_id',
            'startup_id'
        )
        // ->where('is_active', 1)
        ->withPivot([
            'id',
            ...Application::FILLABLES
        ]);
    }

    /**
     * Toggle publish
     *
     * @return self
     */
    public function togglePublish(): self
    {
        $this->update([
            'is_published' => intval(!$this->is_published)
        ]);

        return $this;
    }

    /**
     * Is open for application
     *
     * @return Attribute
     */
    public function isOpenForApplication(): Attribute
    {
        return Attribute::make(get: function (): int {
            $value = false;
            if ($this->date_start && $this->date_end) {
                $start = (new Carbon($this->date_start))->startOfDay();
                $end = (new Carbon($this->date_end))->endOfDay();

                $value = (new Carbon())->isBetween($start, $end);
            }

            return $value;
        });
    }
}
