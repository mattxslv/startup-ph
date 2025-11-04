<?php

namespace App\Models\Administrators;

use App\Models\Administrators\Traits\AdministratorHasTemporaryPassword;
use App\Models\News\News;
use App\Models\Resources\Resource;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;

class Administrator extends Authenticatable implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasRoles;
    use HasApiTokens;
    use SoftDeletes;
    use AdministratorHasTemporaryPassword;

    public const RESOURCE_KEY = 'administrators';

    public const FILLABLES = [
        'agency',
        'email',
        'contact_number',
        'with_temporary_password',
        'first_name',
        'middle_name',
        'last_name',
        'suffix_name',
        'photo_url',
        'password',
        'auth_token',
        'auth_validated',
        'region_code',
        'is_regional_focal',
    ];

    public const FILTERS = [
        'q',
    ];

    protected $guard_name = 'api';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = self::FILLABLES;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'auth_validated' => 'datetime',
    ];

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
                $q->where(self::RESOURCE_KEY . '.first_name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.last_name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.email', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Authenticated
     *
     * @return Administrator
     */
    public static function authenticated(): Administrator
    {
        return auth()->user();
    }

    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getDisplayNameAttribute()
    {
        return implode(' ', array_filter([$this->first_name, $this->middle_name, $this->last_name, $this->suffix_name]));
    }

    /**
     * Sync roles
     *
     * @param array $roles
     * @return Administrator
     */
    public function syncRoles(array $roles): Administrator
    {
        $this->auditSync('roles', array_unique($roles));

        return $this;
    }

    /**
     * News
     *
     * @return HasMany
     */
    public function news(): HasMany
    {
        return $this->hasMany(News::class, 'posted_by_id');
    }

    /**
     * Create news
     *
     * @param array $data
     * @return News
     */
    public function createNews(array $data): News
    {
        return $this->news()->create($data);
    }

    /**
     * Resources
     *
     * @return HasMany
     */
    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class, 'posted_by_id');
    }

    /**
     * Create resources
     *
     * @param array $data
     * @return Resource
     */
    public function createResources(array $data): Resource
    {
        return $this->resources()->create($data);
    }

    /**
     * Region relationship
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function region()
    {
        return $this->belongsTo(\App\Models\Addresses\Regions\Region::class, 'region_code', 'code');
    }
}
