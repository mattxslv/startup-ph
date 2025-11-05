<?php

namespace App\Models\Users;

use App\Contracts\WithFileUploadContract;
use App\Models\Users\Traits\MustVerifyEmail;
use App\Models\Users\Traits\UserAttributeChecks;
use App\Models\Users\Traits\UserHasFileUploads;
use App\Models\Users\Traits\WithStartupsTrait;
use App\Traits\WithAddressAttributeTrait;
use App\Traits\DetectsTestAccounts;
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
    use DetectsTestAccounts;

    public const RESOURCE_KEY = 'users';

    public const FILLABLES = [
        'email',
        'email_verified_at',
        'is_test_account',
        'user_type',
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
        'user_type',
        'is_test_account',
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
        'remember_token',
    ];

    /**
     * Boot the model
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            // Auto-flag test accounts on creation
            $user->autoFlagTestAccount();
        });

        static::updating(function ($user) {
            // Re-check test account status on email/name change
            if ($user->isDirty(['email', 'first_name', 'name'])) {
                $user->autoFlagTestAccount();
            }
        });
    }

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

        if (isset($filters['user_type'])) {
            $query->where('user_type', $filters['user_type']);
        }

        if (isset($filters['is_test_account'])) {
            $isTestAccount = is_string($filters['is_test_account']) 
                ? (bool) (int) $filters['is_test_account'] 
                : (bool) $filters['is_test_account'];
            $query->where('is_test_account', $isTestAccount);
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
