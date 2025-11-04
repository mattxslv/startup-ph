<?php

namespace Dmn\PhAddress;

use Dmn\PhAddress\Validators\ValidBarangay;
use Dmn\PhAddress\Validators\ValidCountry;
use Dmn\PhAddress\Validators\ValidMunicipality;
use Dmn\PhAddress\Validators\ValidProvince;
use Dmn\PhAddress\Validators\ValidRegion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class PhAddressServiceProvider extends ServiceProvider
{
    /**
     * @inheritDoc
     */
    public function boot()
    {
        Validator::extend(
            'valid_region_code',
            ValidRegion::class . '@validate'
        );

        Validator::extend(
            'valid_province_code',
            ValidProvince::class . '@validate'
        );

        Validator::extend(
            'valid_municipality_code',
            ValidMunicipality::class . '@validate'
        );

        Validator::extend(
            'valid_barangay_code',
            ValidBarangay::class . '@validate'
        );

        Validator::extend(
            'valid_country_code',
            ValidCountry::class . '@validate'
        );
    }
}
