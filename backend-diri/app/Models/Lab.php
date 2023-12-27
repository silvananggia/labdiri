<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Lab extends Model
{
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    public function labDetail()
     {
     return $this->hasOne(LabDetail::class, 'idlab', 'id');
 }
}
