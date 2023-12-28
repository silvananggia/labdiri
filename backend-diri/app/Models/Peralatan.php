<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Traits\Uuids;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;
class Peralatan extends Model implements HasMedia
{
    use HasFactory, Uuids, InteractsWithMedia;

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

    public function laboratorium(): BelongsTo
    {
        return $this->belongsTo(lab::class, 'satuan_kerja_id','satuan_kerja_id');
    }

}
