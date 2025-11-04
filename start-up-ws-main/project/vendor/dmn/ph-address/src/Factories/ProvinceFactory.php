<?php

namespace Dmn\PhAddress\Factories;

use Dmn\PhAddress\Models\Province;
use Dmn\PhAddress\Models\Region;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProvinceFactory extends Factory
{
    protected $model = Province::class;

    /**
     * @inheritDoc
     */
    public function definition()
    {
        return [
            'name' => $this->faker->city,
            'code' => $this->faker->lexify('?????????'),
            'region_code' => Region::factory(),
        ];
    }
}
