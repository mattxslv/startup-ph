<?php

namespace Tests;

use Dmn\PhAddress\Models\Barangay;
use Tests\TestCase;

class BarangayHttpTest extends TestCase
{
    /**
     * @test
     * @testdox Barangay list
     *
     * @return void
     */
    public function listBarangay(): void
    {
        Barangay::factory(10)->create();
        $this->get('barangay');

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(10, count($response['data']));
    }

    /**
     * @test
     * @testdox Barangay list per page
     *
     * @return void
     */
    public function listBarangayPerPage(): void
    {
        Barangay::factory(10)->create();
        $this->get('barangay?per_page=2');

        $response = $this->response->json();
        $this->assertResponseOk();
        $this->assertEquals(2, count($response['data']));
    }
}
