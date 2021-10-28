<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $fillable =[
        'name',
        'price',
        'manufacturer_id',
        'user_id'
    ];

    public function manufacturer(){
        return $this->belongsTo(Manufacturer::class);
    }

    public function shopUser(){
        return $this->belongsTo(User::class);
    }
}
