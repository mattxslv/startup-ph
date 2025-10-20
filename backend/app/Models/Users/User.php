<?php

namespace App\Models\Users;

use App\Contracts\WithFileUploadContract;
use App\Models\Users\Traits\MustVerifyEmail;
use App\Models\Users\Traits\UserAttributeChecks;
use App\Models\Users\Traits\UserHasFileUploads;
use App\Models\Users\Traits\WithStartupsTrait;
use App\Traits\WithAddressAttributeTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;

class User extends Authenticatable implements Auditable, WithFileUploadContract
{
    use \OwenIt\Auditing\Auditable;
    use HasApiTokens;
    use SoftDeletes;
    use WithAddressAttributeTrait;
    use WithStartupsTrait;
    use UserAttributeChecks;
    use MustVerifyEmail;
    use UserHasFileUploads;

    public const RESOURCE_KEY = 'users';

    public const FILLABLES = [
        'email',
        'email_verified_at',
        'mobile_no',
        'mobile_no_verified_at',
        'first_name',
        'middle_name',
        'last_name',
        'suffix_name',
        'birth_date',
        'birth_place',
        'gender',
        'photo_url',
        'identification_type',
        'identification_no',
        'identification_url',
        // 'profile_type',
        'citizenship',
        'social_classification',
        // 'region_code',
        // 'province_code',
        // 'municipality_code',
        // 'barangay_code',
        // 'street',
        // 'postal_code',
        // 'address_geoloc',
        'interests',
        'password',
        'registered_at',
        // 'profile_completed_at',
        'last_login_at',
        'is_registered_from_sso',
        'egovapp_sso_id',
    ];

    public const FILTERS = [
        'q',
    ];

    public const EMAIL_STATUS = [
        'UNVERIFIED' => 'UNVERIFIED',
        'VERIFIED' => 'VERIFIED',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = self::FILLABLES;

    /**
     * @inheritDoc
     */
    protected $casts = [
        'interests' => 'array',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * Authenticated
     *
     * @return User
     */
    public static function authenticated(): User
    {
        return auth()->user();
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
        if (isset($filters['q'])) {
            $query->where(function ($q) use ($filters) {
                $q->where(self::RESOURCE_KEY . '.first_name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.last_name', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.email', 'like', '%' . $filters['q'] . '%')
                    ->orWhere(self::RESOURCE_KEY . '.mobile_no', 'like', '%' . $filters['q'] . '%');
            });
        }

        return $query;
    }

    /**
     * Get by email
     *
     * @param mixed $email
     * @return User|null
     */
    public static function getByEmail(mixed $email): ?User
    {
        return User::query()->where('email', $email)->first();
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
     * Get is password set attribute
     *
     * @return integer
     */
    public function getIsPasswordSetAttribute(): int
    {
        return boolval($this->password);
    }
}
