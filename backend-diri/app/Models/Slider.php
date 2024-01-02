<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;


class Slider extends Model
{
    use HasFactory,Uuids;


    protected $table = 'sliders';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = ['image', 'title', 'caption'];



}
