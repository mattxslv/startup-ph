<?php

namespace Dmn\PhAddress\Models;

use Dmn\PhAddress\Factories\MunicipalityFactory;
use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\Province;
use Dmn\PhAddress\Models\Region;
use Dmn\PhAddress\Models\SubMunicipality;
use Dmn\PhAddress\Models\Traits\Address;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Municipality extends Model
{
    use Address;
    use HasFactory;

    protected $table = 'municipalities';

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
        return new MunicipalityFactory();
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

    /**
     * Province relationship
     *
     * @return BelongsTo
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * Municipality relationship
     *
     * @return HasMany
     */
    public function subMunicipalities(): HasMany
    {
        return $this->hasMany(SubMunicipality::class);
    }

    /**
     * Barangay relationship
     *
     * @return HasMany
     */
    public function barangays(): HasMany
    {
        return $this->hasMany(Barangay::class);
    }
}
