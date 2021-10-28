<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_shop'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

//public function isShop(){
//        return $this->is_shop == 0;
//    }

    public function ownedParts(){
        return $this->hasMany(Part::class);
    }


    public function appliedRequest(){
        return $this->hasMany(UserRequest::class);
    }

    public function shopRequests()
    {
        return $this->belongsToMany(UserRequest::class,'user_shoprequests')->with('manufacturer')->with('author');
    }
}
