<?php

namespace App\Models\Applications;

use App\Models\Applications\Traits\ApplicationAssessmentTrait;
use App\Models\Applications\Traits\ApplicationHasRequirements;
use App\Models\Applications\Traits\ApplicationSubmissionTrait;
use App\Models\Programs\Program;
use App\Models\Startups\Startup;
use App\Models\Users\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Application extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;
    use ApplicationHasRequirements;
    use ApplicationAssessmentTrait;
    use ApplicationSubmissionTrait;

    public const RESOURCE_KEY = 'applications';

    public const FILLABLES = [
        'user_id',
        'startup_id',
        'startup_name',
        'program_id',
        'program_name',
        'status',
        'remarks',
        'submitted_at',
        'returned_at',
        'approved_at',
        'rejected_at',
    ];

    protected $casts = [];

    public const FILTERS = [
        'status',
        'startup_id',
        'program_id',
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
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['startup_id'])) {
            $query->where('startup_id', $filters['startup_id']);
        }

        if (isset($filters['program_id'])) {
            $query->where('program_id', $filters['program_id']);
        }

        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('startup_name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere('program_name', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * User
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Startup
     *
     * @return BelongsTo
     */
    public function startup(): BelongsTo
    {
        return $this->belongsTo(Startup::class, 'startup_id');
    }

    /**
     * Program
     *
     * @return BelongsTo
     */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class, 'program_id');
    }
}
