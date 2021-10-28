<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    use HasFactory;

    protected $fillable =[
        'name'
    ];

    public function parts(){
        return $this->hasMany(Part::class);
    }

    public function userRequests(){
        return $this->hasMany(UserRequest::class);
    }


}
