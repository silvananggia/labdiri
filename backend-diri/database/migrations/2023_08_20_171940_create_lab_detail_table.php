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
        Schema::create('lab_detail', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('idkategori')->nullable()->unsigned();
            $table->integer('idlab')->unique();
            $table->longText('tusi')->nullable();
            $table->longText('posisi_strategis')->nullable();
            $table->longText('sdm')->nullable();
            $table->string('status');
            $table->foreign('idkategori')->references('id')->on('kategori_lab');
            $table->foreign('idlab')->references('idlabelsa')->on('lab');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_detail');
    }
};
