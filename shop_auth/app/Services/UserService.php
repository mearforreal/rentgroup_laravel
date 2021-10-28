<?php

namespace App\Services;

use App\Models\User;

use Illuminate\Support\Facades\Hash;



class UserService
{

    private $request;

    public function __construct($request)
    {

        $this->request = $request;
    }

    public function register(){
        $fields = $this->request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string',
            'is_shop' => 'boolean'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'is_shop' => $fields['is_shop']
        ]);

        $token = $user->createToken('myapptokenkey')->plainTextToken;

        return [
            'user'=>$user,
            'token'=>$token
        ];
    }

    public function login(){
        $fields = $this->request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // check email;
        $user = User::where('email',$fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'],$user->password)){
            return [
                'status' => '401'
            ];
        }

        $token = $user->createToken('myapptokenkey')->plainTextToken;


        return  [
            'status' => '201',
            'user'=>$user,
            'token'=>$token
        ];
    }


    public function logout(){
        auth()->user()->tokens()->delete();

        return [
            'message'=> 'logged out'
        ];
    }

}
