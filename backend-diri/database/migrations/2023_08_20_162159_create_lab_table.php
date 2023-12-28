<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLabTable extends Migration
{
    public function up()
    {
        Schema::create('lab', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('idlabelsa')->unique();
            $table->integer('satuan_kerja_id')->unique();
            $table->string('lokasi_kawasan');
            $table->string('nama');
            $table->text('deskripsi');
            $table->string('usernameintra_manajer')->nullable();
            $table->string('usernameintra_koordinator')->nullable();
            $table->string('usernameintra_manajer_alat')->nullable();
            $table->string('alamat')->nullable();
            $table->string('email')->nullable();
            $table->string('telepon')->nullable();
            $table->string('checksum')->nullable(); // Add checksum column
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('lab');
    }
}
