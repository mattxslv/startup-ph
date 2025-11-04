<?php

namespace Tests;

use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\Municipality;
use Dmn\PhAddress\Models\SubMunicipality;
use Tests\TestCase;

class MunicipalityHttpTest extends TestCase
{
    /**
     * @test
     * @testdox Municipality list
     *
     * @return void
     */
    public function listMunicipality(): void
    {
        Municipality::factory(10)->create();
        $this->get('municipality');

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(10, count($response['data']));
    }

    /**
     * @test
     * @testdox Municipality list per page
     *
     * @return void
     */
    public function listMunicipalityPerPage(): void
    {
        Municipality::factory(10)->create();
        $this->get('municipality?per_page=2');

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(2, count($response['data']));
    }

    /**
     * @test
     * @testdox Filter municipalities
     *
     * @return void
     */
    public function filterMunicipality(): void
    {
        Municipality::factory(10)->create();
        $municipality = Municipality::first();
        $this->get('municipality?q=' . $municipality->name);

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(1, count($response['data']));
    }

    /**
     * @test
     * @testdox Barangays under a municipality
     *
     * @return void
     */
    public function barangaysInMunicipality(): void
    {
        $municipality = Municipality::factory()->create();
        Barangay::factory()->count(10)->create(['municipality_code' => $municipality->code]);

        $this->get('municipality/' . $municipality->code . '/barangay');
        $this->assertResponseOk();

        $response = $this->response->json();
        $this->assertEquals(10, count($response['data']));
    }

    /**
     * @test
     * @testdox Barangays under a municipality
     *
     * @return void
     */
    public function filterbarangaysInMunicipality(): void
    {
        $municipality = Municipality::factory()->create();
        Barangay::factory()->count(10)->create(['municipality_code' => $municipality->code]);

        $barangay = Barangay::first();

        $this->get('municipality/' . $municipality->code . '/barangay?q=' . $barangay->name);
        $this->assertResponseOk();

        $response = $this->response->json();
        $this->assertEquals(1, count($response['data']));
    }

    /**
     * @test
     * @testdox Sub municipalitie under a municipality
     *
     * @return void
     */
    public function subMunicipalitiesInMunicipality(): void
    {
        $municipality = Municipality::factory()->create();
        SubMunicipality::factory()->count(10)->create(['municipality_code' => $municipality->code]);

        $this->get('municipality/' . $municipality->code . '/sub_municipality');
        $this->assertResponseOk();

        $response = $this->response->json();
        $this->assertEquals(10, count($response['data']));
    }

    /**
     * @test
     * @testdox Sub Municipality under a municipality ~ filter
     *
     * @return void
     */
    public function filterSubMunicipalitiesInMunicipality(): void
    {
        $municipality = Municipality::factory()->create();
        SubMunicipality::factory()->count(10)->create(['municipality_code' => $municipality->code]);

        $subMunicipality = SubMunicipality::first();

        $this->get('municipality/' . $municipality->code . '/sub_municipality?q=' . $subMunicipality->name);
        $this->assertResponseOk();

        $response = $this->response->json();
        $this->assertEquals(1, count($response['data']));
    }
}
