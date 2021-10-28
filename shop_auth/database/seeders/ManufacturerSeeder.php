<?php

namespace Database\Seeders;

use App\Models\Manufacturer;
use Illuminate\Database\Seeder;

class ManufacturerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Manufacturer::truncate();
        $manufacturer = array('Китай','Германия','Япония','Корея','Франция','Россия','Англия');
        //

        foreach ($manufacturer as $manu){
            Manufacturer::create([
                'name' => $manu,
            ]);
        }
    }
}
