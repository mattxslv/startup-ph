<?php

namespace Dmn\PhAddress\Factories;

use Dmn\PhAddress\Models\Country;
use Illuminate\Database\Eloquent\Factories\Factory;

class CountryFactory extends Factory
{
    protected $model = Country::class;

    /**
     * @inheritDoc
     */
    public function definition()
    {
        return [
            'name' => $this->faker->country,
            'code' => $this->faker->countryCode,
        ];
    }
}
