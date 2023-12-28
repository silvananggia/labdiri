<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('peralatan_detail', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('idalat');
            $table->longText('spesifikasi')->nullable();
            $table->longText('fungsi')->nullable();
            $table->longText('deskripsi')->nullable();
            $table->string('dimensi')->nullable();
            $table->double('harga_perolehan')->nullable();
            $table->longText('keterangan')->nullable();
            $table->string('status_kalibrasi')->nullable();
            $table->year('tahun_kalibrasi')->nullable();
            $table->longText('link_elsa')->nullable();
            $table->string('noseri')->nullable();
            $table->string('sumber_tenaga')->nullable();
            $table->string('status_ketersediaan')->nullable();
            $table->string('lokasi_penyimpanan')->nullable();
            $table->foreign('idalat')->references('idalatelsa')->on('peralatan');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peralatan_detail');
    }
};
