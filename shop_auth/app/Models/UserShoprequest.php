<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


//bad name
class UserShoprequest extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'user_request_id',
        'user_id',
    ];


}
