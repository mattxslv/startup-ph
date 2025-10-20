<?php

namespace App\Traits;

use App\Models\Addresses\Barangays\Barangay;
use App\Models\Addresses\Municipalities\Municipality;
use App\Models\Addresses\Provinces\Province;
use App\Models\Addresses\Regions\Region;

trait WithAddressAttributeTrait
{
    /**
     * Region
     *
     * @return belongsTo
     */
    public function region()
    {
        return $this->belongsTo(Region::class, 'region_code', 'code');
    }

    /**
     * Province
     *
     * @return belongsTo
     */
    public function province()
    {
        return $this->belongsTo(Province::class, 'province_code', 'code');
    }

    /**
     * Municipality
     *
     * @return belongsTo
     */
    public function municipality()
    {
        return $this->belongsTo(Municipality::class, 'municipality_code', 'code');
    }

    /**
     * Barangay
     *
     * @return belongsTo
     */
    public function barangay()
    {
        return $this->belongsTo(Barangay::class, 'barangay_code', 'code');
    }

    /**
     * Get display address attribute
     *
     * @return string
     */
    public function getDisplayAddressAttribute(): string
    {
        return implode(', ', array_filter([
            $this->street,
            optional($this->barangay)->name,
            optional($this->municipality)->name,
            optional($this->province)->name
        ]));
    }
}
