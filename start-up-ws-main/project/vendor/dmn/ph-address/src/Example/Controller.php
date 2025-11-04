<?php

namespace Dmn\PhAddress\Example;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function testWithoutDependency(Request $request)
    {
        return $this->validate($request, [
            'region_code' => 'valid_region_code',
            'province_code' => 'valid_province_code',
            'municipality_code' => 'valid_municipality_code',
            'barangay_code' => 'valid_barangay_code',
        ]);
    }

    public function testWithDependency(Request $request)
    {
        $this->validate($request, [
            'region_code' => 'valid_region_code',
            'province_code' => 'valid_province_code:region_code',
            'municipality_code' => 'valid_municipality_code:province_code',
            'barangay_code' => 'valid_barangay_code:municipality_code',
        ]);

        return response([]);
    }

    public function testWithDependencyInvalid(Request $request)
    {
        return $this->validate($request, [
            'region_code' => 'valid_region_code',
            'province_code' => 'valid_province_code:123',
            'municipality_code' => 'valid_municipality_code:123',
            'barangay_code' => 'valid_barangay_code:123',
        ]);
    }

    public function testCountry(Request $request)
    {
        return $this->validate($request, [
            'country_code' => 'valid_country_code',
        ]);
    }
}
