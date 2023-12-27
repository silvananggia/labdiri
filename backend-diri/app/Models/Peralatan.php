<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Traits\Uuids;
class Peralatan extends Model
{
    use  HasFactory, Uuids;

    protected $table = 'peralatan';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'idalatelsa',
        'kode_barang',
        'nup',
        'nama_barang',
        'merk',
        'tahun_perolehan',
        'satuan_kerja_id',
        'kondisi',
        'trx_referensi_laboratorium_id',
        'usernameintra_manajer_alat',
    ];


}
