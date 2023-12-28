<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $pages = [
            [
                'title' => 'Tentang Kami',
                'slug' => 'tentang-kami',
                'content' => 'Dalam tahap pengembangan',
            ],
            [
                'title' => 'Visi Misi',
                'slug' => 'visi-misi',
                'content' => 'Dalam tahap pengembangan',
            ],
            [
                'title' => 'Struktur Organisasi',
                'slug' => 'struktur-organisasi',
                'content' => 'Dalam tahap pengembangan',
            ],
        ];

        foreach ($pages as $page) {
            $page['id'] = Str::uuid();
            $page['created_at'] = now();
            $page['updated_at'] = now();
            DB::table('pages')->insert($page);
        }
    }
}
