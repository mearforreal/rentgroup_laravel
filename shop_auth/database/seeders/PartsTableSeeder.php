<?php

namespace Database\Seeders;

use App\Models\Manufacturer;
use App\Models\Part;
use Illuminate\Database\Seeder;
use Faker\Factory;

class PartsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws \Exception
     */
    public function run()
    {



        $manufacturers = Manufacturer::all();
        $randomId = array();
        foreach ($manufacturers as $manu){
            array_push($randomId,$manu['id']);
        }


        // truncate existing records
        Part::truncate();


//        $faker = Factory::create();
//
//        for ($i = 0; $i < 20; $i++) {
//            Part::create([
//                'name' => $faker->word,
//                'price' => $faker->numberBetween(50,10000),
//                'manufacturer_id' => $randomId[array_rand($randomId, 1)]
//            ]);
//        }
    }
}
