<?php

namespace Dmn\PhAddress\Models;

use Dmn\PhAddress\Factories\SubMunicipalityFactory;
use Dmn\PhAddress\Models\Municipality;
use Dmn\PhAddress\Models\Traits\Address;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubMunicipality extends Model
{
    use Address;
    use HasFactory;

    protected $table = 'sub_municipalities';

    protected $primaryKey = 'code';

    protected $keyType = 'string';

    public $incrementing = false;

    public $timestamps = false;

    /**
     * Factory
     *
     * @return Factory
     */
    protected static function newFactory(): Factory
    {
        return new SubMunicipalityFactory();
    }

    /**
     * Barangays relationship
     *
     * @return HasMany
     */
    public function barangays(): HasMany
    {
        return $this->hasMany(Barangay::class);
    }

    /**
     * Municipality relationship
     *
     * @return BelongsTo
     */
    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipality::class);
    }

    /**
     * Province Relationship
     *
     * @return BelongsTo
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * Region relationship
     *
     * @return BelongsTo
     */
    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }
}
