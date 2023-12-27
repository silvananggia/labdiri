<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;

class LabDetail extends Model implements HasMedia
{
    use HasFactory,Uuids, InteractsWithMedia;

    protected $table = 'lab_detail';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['idkategori','idlab','nama','tusi','posisi_strategis','sdm','status'];



    public function lab(): HasOne
    {
        return $this->hasOne(lab::class, 'idlabelsa','idlab');
    }
    public function kategorilab(): HasOne
    {
        return $this->hasOne(kategorilab::class, 'id','idkategori');
    }


    public function mitra(): HasMany
    {
        return $this->hasMany(mitra::class,'idlab','id');
    }


}
