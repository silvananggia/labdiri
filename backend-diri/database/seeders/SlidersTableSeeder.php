<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Slider;

class SlidersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Slider::create([
            'image' => 'images/slider/slider1.webp',
            'title' => 'Informasi Database Alat dan Laboratorium',
            'caption' => 'Direktorat Pengelolaan Laboratorium, Fasilitas Riset dan Kawasan Sains Teknologi',
        ]);

        Slider::create([
            'image' => 'images/slider/slider2.webp',
            'title' => 'Direktorat Pengelolaan Laboratorium, Fasilitas Riset dan Kawasan Sains Teknologi',
            'caption' => '',
        ]);
    }
}
