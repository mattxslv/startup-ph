<?php

namespace Tests;

use Dmn\PhAddress\Example\Controller;
use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\Country;
use Dmn\PhAddress\Models\Region;
use Tests\TestCase;

class AddressTest extends TestCase
{
    /**
     * @test
     * @testdox Seeder
     *
     * @return void
     */
    public function seeder(): void
    {
        $this->artisan('db:seed --class=AddressSeeder');
        $this->seeInDatabase('barangays', ['code' => '012802001']);
    }

    /**
     * @test
     * @testdox Seeder with Region
     *
     * @return void
     */
    public function seederWithRegion(): void
    {
        Region::factory()->create();
        $this->artisan('db:seed --class=AddressSeeder');
        $this->notSeeInDatabase('barangays', ['code' => '012802001']);
    }

    /**
     * @test
     * @testdox Country seeder
     *
     * @return void
     */
    public function countrySeeder(): void
    {
        $this->artisan('db:seed --class=CountrySeeder');
        $this->seeInDatabase('countries', [
            'code' => 'PH',
            'name' => 'Philippines'
        ]);
    }

    /**
     * @test
     * @testdox Country seeder
     *
     * @return void
     */
    public function countrySeederWithCountry(): void
    {
        Country::factory()->create();
        $this->artisan('db:seed --class=CountrySeeder');
        $this->notSeeInDatabase('countries', [
            'code' => 'PH',
            'name' => 'Philippines'
        ]);
    }

    /**
     * @test
     * @testdox Http test without dependency
     *
     * @return void
     */
    public function httpTestWithoutDependency()
    {
        $this->app
            ->router
            ->post('test', Controller::class . '@testWithoutDependency');

        $this->post('test', [
            'region_code' => 'invalid',
            'province_code' => 'invalid',
            'municipality_code' => 'invalid',
            'barangay_code' => 'invalid',
        ]);

        $this->response->assertJsonValidationErrors([
                'region_code' => 'validation.valid_region_code',
                'province_code' => 'validation.valid_province_code',
                'municipality_code' => 'validation.valid_municipality_code',
                'barangay_code' => 'validation.valid_barangay_code',
            ], null);
    }

    /**
     * @test
     * @testdox Http test with dependency
     *
     * @return void
     */
    public function httpTestWithDependency(): void
    {
        $barangay = Barangay::factory()->create();

        $this->app
            ->router
            ->post('test', Controller::class . '@testWithDependency');

        $this->post('test', [
            'region_code' => $barangay->region_code,
            'province_code' => $barangay->province_code,
            'municipality_code' => $barangay->municipality_code,
            'barangay_code' => $barangay->code,
        ]);

        $this->assertResponseOk();
    }

    /**
     * @test
     * @testdox Http test with dependency
     *
     * @return void
     */
    public function httpTestWithDependencyInvalid(): void
    {
        $barangay = Barangay::factory()->create();

        $this->app
            ->router
            ->post('test', Controller::class . '@testWithDependencyInvalid');

        $this->post('test', [
            'region_code' => $barangay->region_code,
            'province_code' => $barangay->province_code,
            'municipality_code' => $barangay->municipality_code,
            'barangay_code' => $barangay->code,
        ]);

        $this->response->assertJsonValidationErrors([
                'province_code' => 'validation.valid_province_code',
                'municipality_code' => 'validation.valid_municipality_code',
                'barangay_code' => 'validation.valid_barangay_code',
            ], null);
    }

    /**
     * @test
     * @testdox Country validator
     *
     * @return void
     */
    public function countryValidator(): void
    {
        $this->app
            ->router
            ->post('test', Controller::class . '@testCountry');

        $this->post('test', [
            'country_code' => 'test'
        ]);

        $this->response->assertJsonValidationErrors([
            'country_code' => 'validation.valid_country_code'
        ], null);
    }

    /**
     * @test
     * @testdox Country successful validation
     *
     * @return void
     */
    public function countrySuccessValidation(): void
    {
        $country = Country::factory()->create();

        $this->app
            ->router
            ->post('test', Controller::class . '@testCountry');

        $this->post('test', [
            'country_code' => $country->code
        ]);

        $this->assertResponseOk();
    }
}
