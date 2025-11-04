<?php

namespace Database\Seeders;

use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\Municipality;
use Dmn\PhAddress\Models\Province;
use Dmn\PhAddress\Models\Region;
use Dmn\PhAddress\Models\SubMunicipality;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    protected $codeLength = 9;

    protected $padding = '0';
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        $file = __DIR__ . '/PSGC.csv';

        if (app()->environment() == 'testing') {
            $file = __DIR__ . '/PSGCTest.csv';
        }

        if (Region::count() > 0) {
            return;
        }

        ini_set('auto_detect_line_endings', true);
        $handle = fopen($file, 'r');
        while (($data = fgetcsv($handle)) !== false) {
            $this->insertToDb($data);
        }

        ini_set('auto_detect_line_endings', false);
    }

    /**
     * Insert to DB
     *
     * @param array $data
     *
     * @return void
     */
    private function insertToDb(array $data): void
    {
        if ($data[2] == 'Reg') {
            $this->insertToRegion($data);
        }

        if (in_array($data[2], ['Prov', 'Dist'])) {
            $this->insertToProvince($data);
        }

        if (in_array($data[2], ['Mun', 'City'])) {
            $this->insertToMunicipality($data);
        }

        if (in_array($data[2], ['SubMun'])) {
            $this->insertToSubMunicipality($data);
        }

        if ($data[2] == 'Bgy') {
            $this->insertToBarangay($data);
        }
    }

    /**
     * Insert to Region
     *
     * @param array $data
     *
     * @return void
     */
    private function insertToRegion(array $data): void
    {
        Region::create([
            'code' => $data[0],
            'name' => $data[1],
        ]);
    }

    /**
     * Insert To Province
     *
     * @param array $data
     *
     * @return void
     */
    private function insertToProvince(array $data): void
    {
        Province::create([
            'code' => $data[0],
            'region_code' => $this->getRegionCode($data[0]),
            'name' => $data[1],
        ]);
    }

    /**
     * Insert to municipality
     *
     * @param array $data
     *
     * @return void
     */
    private function insertToMunicipality(array $data): void
    {
        $hasSub = false;

        $provinceCode = $this->getProvinceCode($data[0]);

        if ($provinceCode == '133900000') {
            $hasSub = true;
        }

        Municipality::create([
            'code' => $data[0],
            'region_code' => $this->getRegionCode($data[0]),
            'province_code' => $provinceCode,
            'name' => $data[1],
            'has_sub' => $hasSub,
        ]);
    }

    private function insertToSubMunicipality(array $data): void
    {
        $provinceCode = $this->getProvinceCode($data[0]);

        SubMunicipality::create([
            'code' => $data[0],
            'region_code' => $this->getRegionCode($data[0]),
            'province_code' => $provinceCode,
            'municipality_code' => $provinceCode,
            'name' => $data[1],
        ]);
    }

    /**
     * Insert to barangay
     *
     * @param array $data
     *
     * @return void
     */
    private function insertToBarangay(array $data): void
    {
        $provinceCode     = $this->getProvinceCode($data[0]);
        $municipalityCode = $this->getMunicipalityCode($data[0], $provinceCode);
        Barangay::create([
            'code' => $data[0],
            'region_code' => $this->getRegionCode($data[0]),
            'province_code' => $provinceCode,
            'municipality_code' => $municipalityCode,
            'sub_municipality_code' => $this->getSubMunicipalityCode($data[0], $municipalityCode),
            'name' => $data[1],
        ]);
    }

    /**
     * Get Region code
     *
     * @param string $code
     *
     * @return string
     */
    private function getRegionCode(string $code): string
    {
        $regionCode = substr($code, 0, 2);
        return str_pad($regionCode, $this->codeLength, $this->padding);
    }

    /**
     * Get Province code
     *
     * @param string $code
     *
     * @return string
     */
    private function getProvinceCode(string $code): string
    {
        $provinceCode = substr($code, 0, 4);
        return str_pad($provinceCode, $this->codeLength, $this->padding);
    }

    /**
     * Get Municipality code
     *
     * @param string $code
     * @param string|null $provinceCode
     *
     * @return string
     */
    private function getMunicipalityCode(string $code, $provinceCode = null): string
    {
        if ($provinceCode == '133900000') {
            return '133900000';
        }

        $municipalityCode = substr($code, 0, 6);
        return str_pad($municipalityCode, $this->codeLength, $this->padding);
    }

    /**
     * Get SubMunicipality code
     *
     * @param string $code
     * @param string|null $municipalityCode
     *
     * @return string|null
     */
    private function getSubMunicipalityCode(string $code, $municipalityCode = null)
    {
        if ($municipalityCode != '133900000') {
            return null;
        }

        $subMunicipalityCode = substr($code, 0, 6);
        return str_pad($subMunicipalityCode, $this->codeLength, $this->padding);
    }
}
