<?php

namespace Database\Seeders;

use Dmn\PhAddress\Models\Barangay;
use Dmn\PhAddress\Models\Municipality;
use Dmn\PhAddress\Models\Province;
use Dmn\PhAddress\Models\Region;
use Dmn\PhAddress\Models\SubMunicipality;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NewAddressSeeder extends Seeder
{
    protected $codeLength = 10;

    protected $padding = '0';

    protected $region;
    protected $province;
    protected $municipality;
    protected $subMunicipality;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::table('regions')->truncate();
        DB::table('provinces')->truncate();
        DB::table('municipalities')->truncate();
        DB::table('sub_municipalities')->truncate();
        DB::table('barangays')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        Model::unguard();
        $file = resource_path('csv/PSGC.csv');

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
    private function insertToDb(array $data)
    {
        if (!$data[0]) {
            return;
        }

        if ($data[3] == 'Reg') {
            return $this->insertToRegion($data);
        }

        if (in_array($data[3], ['Prov', 'Dist'])) {
            return $this->insertToProvince($data);
        }

        if (in_array($data[3], ['Mun', 'City', 'SubMun'])) {
            return $this->insertToMunicipality($data);
        }

        // if (in_array($data[3], ['SubMun'])) {
        //     return $this->insertToSubMunicipality($data);
        // }

        if ($data[3] == 'Bgy') {
            return $this->insertToBarangay($data);
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
        $this->region = Region::create([
            'code' => $data[0],
            'correspondence_code' => $data[2] ?? null,
            'name' => mb_strtoupper(trim($data[1])),
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
        $this->province = Province::create([
            'code' => $data[0],
            'correspondence_code' => $data[2] ?? null,
            'region_code' => $this->region->code,
            'name' => mb_strtoupper(trim($data[1])),
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
        $this->municipality = Municipality::create([
            'code' => $data[0],
            'correspondence_code' => $data[2] ?? null,
            'region_code' => $this->region->code,
            'province_code' => $this->province->code,
            'name' => mb_strtoupper(($data[3] == 'SubMun' ? 'CITY OF MANILA - ' : '') . trim($data[1])),
            'is_sub' => $data[3] == 'SubMun',
        ]);

        $this->subMunicipality = null;
    }

    private function insertToSubMunicipality(array $data): void
    {
        $this->subMunicipality = SubMunicipality::create([
            'code' => $data[0],
            'correspondence_code' => $data[2] ?? null,
            'region_code' => $this->region->code,
            'province_code' => $this->province->code,
            'municipality_code' => $this->municipality->code,
            'name' => mb_strtoupper(trim($data[1])),
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
        Barangay::create([
            'code' => $data[0],
            'correspondence_code' => $data[2] ?? null,
            'region_code' => $this->region->code,
            'province_code' => $this->province->code,
            'municipality_code' => $this->municipality->code,
            'sub_municipality_code' => $this->subMunicipality->code ?? null,
            'name' => mb_strtoupper(trim($data[1])),
        ]);
    }
}
