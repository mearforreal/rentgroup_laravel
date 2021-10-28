<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserRequestsController;
use App\Http\Controllers\ManufacturersController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/image/{fileName}', [UserRequestsController::class, 'image']);


// Protected routes
Route::middleware('auth:sanctum', 'verified')->group(function () {
    Route::get('/manufacturer',[ManufacturersController::class,'index']);
    Route::post('/search', [UserRequestsController::class, 'search']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum', 'verified', 'authshop')->group(function () {
    Route::get('/requested-parts', [UserRequestsController::class, 'getRequestedParts']);
    Route::get('/parts-user', [PartsController::class, 'partsOfUser']);

    Route::resource('parts',PartsController::class);

});



//Route::get('/parts', [PartsController::class, 'index']);
//Route::post('/parts', [PartsController::class, 'store']);
//Route::put('/parts/{id}', [PartsController::class, 'update']);
//Route::delete('/parts/{id}', [PartsController::class, 'destroy']);

//Route::middleware('auth:sanctum')->get('/user', function () {
//    Route::get('/parts/search/{name}',[PartsController::class,'search']);
//
//});

//Route::group(['middleware'=>['auth:sanctum']],function (){
//    Route::get('/parts/search/{name}',[PartsController::class,'search']);
//});
