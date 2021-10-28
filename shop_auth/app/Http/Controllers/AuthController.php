<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Services\UserService;

class AuthController extends Controller
{
    public function register(Request  $request){

        $userService = new UserService($request);
        $response = $userService->register();

        return response($response,201);
    }

    public function login(Request  $request){
        $userService = new UserService($request);
        $response = $userService->login();

        if($response['status'] == '201'){
            return response($response,201);
        }else{
            return response($response,401);
        }



    }


    public function logout(Request $request){
        $userService = new UserService($request);
        return $userService->logout();
    }
}
