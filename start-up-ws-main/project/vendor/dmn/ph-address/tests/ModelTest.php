<?php

namespace Tests;

use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\Municipality;
use Dmn\PhAddress\Models\Province;
use Dmn\PhAddress\Models\Region;
use Dmn\PhAddress\Models\SubMunicipality;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;

class ModelTest extends TestCase
{
    /**
     * @test
     * @testdox Region
     *
     * @return void
     */
    public function region(): void
    {
        Barangay::factory()->create();

        $region = Region::first();

        $this->assertInstanceOf(Collection::class, $region->provinces);
        $this->assertInstanceOf(Province::class, $region->provinces->first());

        $this->assertInstanceOf(Collection::class, $region->municipalities);
        $this->assertInstanceOf(Municipality::class, $region->municipalities->first());

        $this->assertInstanceOf(Collection::class, $region->subMunicipalities);
        $this->assertInstanceOf(SubMunicipality::class, $region->subMunicipalities->first());

        $this->assertInstanceOf(Collection::class, $region->barangays);
        $this->assertInstanceOf(Barangay::class, $region->barangays->first());
    }

    /**
     * @test
     * @testdox Province
     *
     * @return void
     */
    public function province(): void
    {
        Barangay::factory()->create();

        $province = Province::first();

        $this->assertInstanceOf(Region::class, $province->region);

        $this->assertInstanceOf(Collection::class, $province->municipalities);
        $this->assertInstanceOf(Municipality::class, $province->municipalities->first());

        $this->assertInstanceOf(Collection::class, $province->subMunicipalities);
        $this->assertInstanceOf(SubMunicipality::class, $province->subMunicipalities->first());

        $this->assertInstanceOf(Collection::class, $province->barangays);
        $this->assertInstanceOf(Barangay::class, $province->barangays->first());
    }

    /**
     * @test
     * @testdox Municipality
     *
     * @return void
     */
    public function municipality(): void
    {
        Barangay::factory()->create();

        $municipality = Municipality::first();

        $this->assertInstanceOf(Region::class, $municipality->region);
        $this->assertInstanceOf(Province::class, $municipality->province);

        $this->assertInstanceOf(Collection::class, $municipality->subMunicipalities);
        $this->assertInstanceOf(SubMunicipality::class, $municipality->subMunicipalities->first());

        $this->assertInstanceOf(Collection::class, $municipality->barangays);
        $this->assertInstanceOf(Barangay::class, $municipality->barangays->first());
    }

    /**
     * @test
     * @testdox SubMunicipality
     *
     * @return void
     */
    public function subMunicipality(): void
    {
        Barangay::factory()->create();

        $subMunicipality = SubMunicipality::first();

        $this->assertInstanceOf(Region::class, $subMunicipality->region);
        $this->assertInstanceOf(Province::class, $subMunicipality->province);
        $this->assertInstanceOf(Municipality::class, $subMunicipality->municipality);

        $this->assertInstanceOf(Collection::class, $subMunicipality->barangays);
        $this->assertInstanceOf(Barangay::class, $subMunicipality->barangays->first());
    }

    /**
     * @test
     * @testdox Barangay
     *
     * @return void
     */
    public function barangay(): void
    {
        $barangay = Barangay::factory()->create();

        $this->assertInstanceOf(Region::class, $barangay->region);
        $this->assertInstanceOf(Province::class, $barangay->province);
        $this->assertInstanceOf(Municipality::class, $barangay->municipality);
        $this->assertInstanceOf(SubMunicipality::class, $barangay->subMunicipality);
    }
}
