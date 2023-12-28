<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePeralatanTable extends Migration
{
    public function up()
    {
        Schema::create('peralatan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('idalatelsa')->unique();
            $table->string('kode_barang');
            $table->integer('nup');
            $table->string('nama_barang');
            $table->string('merk');
            $table->integer('tahun_perolehan');
            $table->integer('satuan_kerja_id');
            $table->string('kondisi')->nullable();
            $table->integer('trx_referensi_laboratorium_id')->nullable();
            $table->string('usernameintra_manajer_alat')->nullable();
            $table->string('checksum')->nullable(); //
            $table->foreign('satuan_kerja_id')->references('satuan_kerja_id')->on('lab')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('peralatan');
    }
}
