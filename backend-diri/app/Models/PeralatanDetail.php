<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class PeralatanDetail extends Model implements HasMedia
{
    use HasFactory, Uuids, InteractsWithMedia;

    protected $table = 'peralatan_detail';
    protected $primaryKey = 'id';

    public $incrementing = false;

    protected $fillable = ['idalat','spesifikasi','fungsi','deskripsi','dimensi','harga_perolehan','keterangan','status_kalibrasi','tahun_kalibrasi','link_elsa','noseri','sumber_tenaga','lokasi_penyimpanan','status'];


    public function peralatan()
    {
        return $this->belongsTo(Peralatan::class, 'idalat', 'idalatelsa');
    }
}
