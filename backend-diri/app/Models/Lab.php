<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class Lab extends Model implements HasMedia
{
    use HasFactory,Uuids, InteractsWithMedia;
    protected $table = 'lab';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'idlabelsa',
        'satuan_kerja_id',
        'lokasi_kawasan',
        'nama',
        'deskripsi',
        'usernameintra_manajer',
        'usernameintra_koordinator',
        'usernameintra_manajer_alat',
        'alamat',
        'email',
        'telepon',
    ];



    public function labDetail()
     {
     return $this->hasOne(LabDetail::class, 'idlab', 'id');
 }
}
