<?php

namespace Tests;

use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\SubMunicipality;
use Tests\TestCase;

class SubMunicipalityHttpTest extends TestCase
{
    /**
     * @test
     * @testdox SubMunicipality list
     *
     * @return void
     */
    public function listSubMunicipality(): void
    {
        SubMunicipality::factory(10)->create();
        $this->get('sub_municipality');

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(10, count($response['data']));
    }

    /**
     * @test
     * @testdox SubMunicipality list per page
     *
     * @return void
     */
    public function listSubMunicipalityPerPage(): void
    {
        SubMunicipality::factory(10)->create();
        $this->get('sub_municipality?per_page=2');

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(2, count($response['data']));
    }

    /**
     * @test
     * @testdox Filter sub unicipalities
     *
     * @return void
     */
    public function filterSubMunicipality(): void
    {
        $subMunicipality = SubMunicipality::factory(10)->create();
        $this->get('sub_municipality?q=' . $subMunicipality->first()->name);

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(1, count($response['data']));
    }

    /**
     * @test
     * @testdox Barangays under a sub municipality
     *
     * @return void
     */
    public function barangaysInSubMunicipality(): void
    {
        $subMunicipality = SubMunicipality::factory()->create();
        Barangay::factory(10)->create(['sub_municipality_code' => $subMunicipality->code]);

        $this->get('sub_municipality/' . $subMunicipality->code . '/barangay');
        $this->assertResponseOk();

        $response = $this->response->json();
        $this->assertEquals(10, count($response['data']));
    }

    /**
     * @test
     * @testdox Barangays under a sub municipality
     *
     * @return void
     */
    public function filterbarangaysInSubMunicipality(): void
    {
        $subMunicipality = SubMunicipality::factory()->create();
        Barangay::factory(10)->create(['sub_municipality_code' => $subMunicipality->code]);

        $barangay = Barangay::first();

        $this->get('sub_municipality/' . $subMunicipality->code . '/barangay?q=' . $barangay->name);
        $this->assertResponseOk();

        $response = $this->response->json();
        $this->assertEquals(1, count($response['data']));
    }
}
