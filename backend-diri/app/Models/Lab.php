<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class Lab extends Model
{
    use HasFactory, Uuids;
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

    public function peralatan()
    {
        return $this->hasMany(Peralatan::class, 'satuan_kerja_id', 'satuan_kerja_id');
    }

    public function labdetail()
    {
        return $this->hasOne(LabDetail::class, 'idlab', 'idlabelsa');
    }
}
