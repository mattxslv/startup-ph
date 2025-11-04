<?php

namespace Dmn\PhAddress\Factories;

use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\SubMunicipality;
use Illuminate\Database\Eloquent\Factories\Factory;

class BarangayFactory extends Factory
{
    protected $model = Barangay::class;

    /**
     * @inheritDoc
     */
    public function definition()
    {
        $subMunicipality = SubMunicipality::factory()->create();

        return [
            'name' => $this->faker->city,
            'code' => $this->faker->lexify('?????????'),
            'region_code' => $subMunicipality->region_code,
            'province_code' => $subMunicipality->province_code,
            'municipality_code' => $subMunicipality->municipality_code,
            'sub_municipality_code' => $subMunicipality->code,
        ];
    }
}
