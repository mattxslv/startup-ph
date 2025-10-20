<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AddGIDToAddressData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'data:address-gidm';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add GIDM to address data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Model::unguard();

        // $this->updateProvinces();
        // $this->updateMunicipalities();
        $this->updateBarangays();
    }

    /**
     * Update provinces
     *
     * @return void
     */
    protected function updateProvinces()
    {
        $provinces = resource_path('csv/gadm41/provinces.csv');
        ini_set('auto_detect_line_endings', true);
        $handle = fopen($provinces, 'r');
        $unmatched = 0;

        while (($data = fgetcsv($handle)) !== false) {
            $province = DB::table('provinces')
                ->where('correspondence_code', str_pad(str_pad($data[8], 4, '0', STR_PAD_LEFT), 9, '0', STR_PAD_RIGHT))
                ->first();

            if (!$province) {
                $province = DB::table('provinces')->where('name', $data[3])->first();
            }

            if ($province) {
                DB::table('provinces')->where('code', $province->code)->update(['gidm' => $data[0]]);
            }
        }

        ini_set('auto_detect_line_endings', false);
    }

    /**
     * Update municipalities
     *
     * @return void
     */
    protected function updateMunicipalities()
    {
        $municipalities = resource_path('csv/gadm41/municipalities.csv');
        ini_set('auto_detect_line_endings', true);
        $handle = fopen($municipalities, 'r');
        $unmatched = 0;

        while (($data = fgetcsv($handle)) !== false) {
            if ($data[10] == 'Municipality' || $data[10] == 'City') {
                $municipality = DB::table('municipalities')
                    ->where('correspondence_code', str_pad(str_pad($data[11], 6, '0', STR_PAD_LEFT), 9, '0', STR_PAD_RIGHT))
                    ->first();

                if (!$municipality) {
                    if ($province = DB::table('provinces')->where('gidm', $data[3])->first()) {
                        $municipality = DB::table('municipalities')
                            ->where('province_code', $province->code)
                            ->where('name', $data[6])
                            ->first();

                        if (!$municipality) {
                            // NOTE: This is to update manila sub municipalities
                            if ($data[6] == 'Manila') {
                                DB::table('municipalities')->where('is_sub', 1)->update(['gidm' => $data[0]]);
                            }
                        }
                    }
                }

                if ($municipality) {
                    DB::table('municipalities')->where('code', $municipality->code)->update(['gidm' => $data[0]]);
                }
            }
        }

        ini_set('auto_detect_line_endings', false);
    }

    public function updateBarangays()
    {
        $barangays = resource_path('csv/gadm41/barangays.csv');
        ini_set('auto_detect_line_endings', true);
        $handle = fopen($barangays, 'r');

        $unmatched = 0;

        while (($data = fgetcsv($handle)) !== false) {
            if ($data[12] == 'Barangay' || $data[12] == 'City') {
                if (!($data[9] == 'n.a' || $data[9] == 'n.a.')) {
                    if ($municipalities = DB::table('municipalities')->where('gidm', $data[6])->get()) {
                        $barangay = DB::table('barangays')
                            ->whereIn('municipality_code', $municipalities->pluck('code'))
                            ->where('name', $data[9])
                            ->get();

                        $municipality = $municipalities->first();

                        if (!$barangay->count()) {
                            // if ($data[9] == "Santo Niño") {
                            //     dd(trim(str_replace('Poblacion', '', str_replace('Santo', '', $data[9]))));
                            // }
                            $barangay = DB::table('barangays')
                                ->whereIn('municipality_code', $municipalities->pluck('code'))
                                ->where('name', 'like', '%' . $data[9] . '%')
                                // ->where('name', 'like', '%' . trim(str_replace('Poblacion', '', str_replace('Santo', '', $data[9]))) . '%')
                                ->get();

                            if ($barangay->count() > 1) {
                                $unmatched++;

                                $this->line($unmatched . '. ' . $municipality->code . ' - ' . $data[0] . ' - ' . $data[9]);
                                $this->line(implode(', ', $barangay->pluck('name')->toArray()));

                                // dd($barangay->toArray());
                                // code...
                            }
                        }

                        // if ($barangay) {
                    //     $unmatched++;
                    //     // code...
                    //     // $this->line($unmatched . '.' . $barangay->name . ' - ' . $data[9]);
                        // }

                        if ($barangay->count() != 1) {
                            // $unmatched++;

                            // $this->line($unmatched . '. ' . $municipality->code . ' - ' . $data[0] . ' - ' . $data[9]);
                        }
                    }

                    // if ($municipality) {
                //     DB::table('municipalities')->where('code', $municipality->code)->update(['gidm' => $data[0]]);
                    // }
                }
            }
        }

        ini_set('auto_detect_line_endings', false);
    }
}
