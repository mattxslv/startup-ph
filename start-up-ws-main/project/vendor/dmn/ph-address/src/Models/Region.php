<?php

namespace Dmn\PhAddress\Models;

use Dmn\PhAddress\Factories\RegionFactory;
use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\Municipality;
use Dmn\PhAddress\Models\Province;
use Dmn\PhAddress\Models\SubMunicipality;
use Dmn\PhAddress\Models\Traits\Address;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    use Address;
    use HasFactory;

    protected $table = 'regions';

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
        return new RegionFactory();
    }

    /**
     * Provinces relationship
     *
     * @return HasMany
     */
    public function provinces(): HasMany
    {
        return $this->hasMany(Province::class);
    }

    /**
     * Municipality relationship
     *
     * @return HasMany
     */
    public function municipalities(): HasMany
    {
        return $this->hasMany(Municipality::class);
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
