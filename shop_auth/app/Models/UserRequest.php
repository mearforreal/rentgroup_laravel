<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'manufacturer_id',
        'price_from',
        'price_to',
        'parts_name',
        'author_id',
        'image'
    ];

    public function manufacturer(){
        return $this->belongsTo(Manufacturer::class);
    }

    public function author(){
        return $this->belongsTo(User::class);
    }

    public function shopOwners()
    {
        return $this->belongsToMany(User::class,'user_shoprequests');
    }


}
