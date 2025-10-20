<?php

namespace App\Models\Startups;

use App\Contracts\WithFileUploadContract;
use App\Models\Startups\Traits\StartupAssessmentTrait;
use App\Models\Startups\Traits\StartupAttributeChecks;
use App\Models\Startups\Traits\StartupHasApplications;
use App\Models\Startups\Traits\StartupHasFileUploads;
use App\Models\Startups\Traits\StartupHasPrograms;
use App\Models\Startups\Traits\StartupHasRequirements;
use App\Models\Startups\Traits\StartupPublishingTrait;
use App\Models\Startups\Traits\StartupSubmissionTrait;
use App\Models\Startups\Traits\WithStartupFilters;
use App\Models\Users\User;
use App\Services\SerialNumberService;
use App\Traits\WithAddressAttributeTrait;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use ElasticScoutDriverPlus\Searchable;
use OwenIt\Auditing\Contracts\Auditable;

class Startup extends Model implements Auditable, WithFileUploadContract
{
    use \OwenIt\Auditing\Auditable;
    use HasUuids;
    use SoftDeletes;
    use WithAddressAttributeTrait;
    use StartupAssessmentTrait;
    use StartupPublishingTrait;
    use StartupAttributeChecks;
    use StartupSubmissionTrait;
    use Searchable;
    use WithStartupFilters;
    use StartupHasRequirements;
    use StartupHasApplications;
    use StartupHasPrograms;
    use StartupHasFileUploads;

    public const RESOURCE_KEY = 'startups';

    public const FILLABLES = [
        'startup_number',
        'logo_url',
        'name',
        'slug',
        // 'address_label',
        // 'address_geoloc',
        'region_code',
        'province_code',
        'municipality_code',
        'barangay_code',
        'street',
        'street_two',
        'postal_code',
        'description',
        'short_description',
        'social_website_url',
        'social_instagram_url',
        'social_facebook_url',
        'social_linkedin_url',
        'content',
        'development_phase',
        'founder_name',
        'founding_year',
        'business_classification',
        'business_name',
        'business_mobile_no',
        'tin',
        'registration_no',
        'proof_of_registration_url',
        'business_certificate_expiration_date',
        'sectors',

        'has_funding',
        'fundings',

        'status',
        'remarks',
        'assessment_tags',
        'is_verified',
        'submitted_at',
        'oath_accepted_at',
        'verified_at',
        'returned_at',
        'rejected_at',

        // 'organization',
        // 'application_type',
        // 'contact_no',
        // 'short_description',
        // 'photo_url',
        // 'presentation_url',
        // 'video_url',
        // 'postal_code',
        // 'business_name',
        // 'business_no',
        // 'business_type',
        // 'is_application_completed',
        // 'is_active',
        // 'submitted_at',
        // 'return_remarks',
        // 'flagged_at',
        // 'flag',
        // 'is_published',
        // 'is_featured',
        // 'feature_sequence',
        // 'requirements',
    ];

    public const FILTERS = [
        'user_id',
        'region_code',
        'province_code',
        'municipality_code',
        'barangay_code',
        // 'application_type',
        'status',
        // 'is_active',
        // 'is_application_completed',
        'is_verified',
        'sector',
        'development_phase',
        'q',
    ];

    public const KEYWORDS = [
        'id',
        '_id',
        'user_id',
        'startup_number',
        'slug',
        'tin',
        'status',
        'is_verified',
        'submitted_at',
        'verified_at',
        'returned_at',
        'rejected_at',
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
        'content' => 'array',
        'sectors' => 'array',
        'assessment_tags' => 'array',
        'fundings' => 'array',
        'funding_proof_doc_urls' => 'array',
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
        return $this->formatEsData();
    }

    /**
     * Scope is completed
     *
     * @param mixed $query
     * @return $query
     */
    public function scopeIsCompleted($query)
    {
        return $query->where('is_application_completed', 1);
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
     * Get by id
     *
     * @param mixed $id
     * @return Startup|null
     */
    public static function getById(mixed $id): ?Startup
    {
        return Startup::find($id);
    }

    /**
     * Get by slug
     *
     * @param mixed $slug
     * @return Startup
     */
    public static function getBySlug(mixed $slug): Startup
    {
        return Startup::query()->where('slug', $slug)->firstOrFail();
    }

    /**
     * Generate startup number
     *
     * @return Startup
     */
    public function generateStartupNumber(): Startup
    {
        if (!$this->startup_number) {
            $year = $this->created_at->format('y');

            $number = SerialNumberService::generate(SerialNumberService::TYPES['STARTUP_ID'], [
                'identifier_one' => $year,
            ]);

            $this->update([
                'startup_number' => $year . '-' . str_pad($number, 6, '0', STR_PAD_LEFT)
            ]);
        }

        return $this;
    }

    /**
     * Check if business certificate is expired
     *
     * @return integer
     */
    public function checkIfBusinessCertificateisExpired(): int
    {
        $expired = false;

        if ($this->business_certificate_expiration_date) {
            if (Carbon::parse($this->business_certificate_expiration_date)->endOfDay()->isPast()) {
                $expired = true;
            }
        }

        return $expired;
    }
}
