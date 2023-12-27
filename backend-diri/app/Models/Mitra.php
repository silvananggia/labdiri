<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;

class Mitra extends Model
{
    use HasFactory, Uuids;

    protected $table = 'mitra';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['idlab','nama','logo'];

    public function laboratorium(): HasOne
    {
        return $this->hasOne(laboratorium::class);
    }
}
