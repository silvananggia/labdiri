<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class KategoriLab extends Model
{
    use HasFactory, Uuids;

    protected $table = 'kategori_lab';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['nama','keterangan','logo'];
}
