<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Roles extends Model
{
    use HasFactory, Uuids;

    protected $table = 'roles';
    protected $primaryKey = 'id';
    public $incrementing = false;

    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id', 'id');
    }
}
