<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\API\LabController;
use App\Http\Controllers\API\PeralatanController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\API\PagesController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\RolesController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\KategoriLabController;
use App\Http\Controllers\API\LokasiController;
use App\Http\Controllers\API\LaboratoriumController;
use App\Http\Controllers\API\MitraController;
use App\Http\Controllers\API\AlatController;
use App\Http\Controllers\API\FotoAlatController;
use App\Http\Controllers\API\LogbookController;
use App\Http\Controllers\API\LogbookMaintenanceController;
use App\Http\Controllers\API\PengajuanMaintenanceController;
use App\Http\Controllers\API\LogbookKalibrasiController;
use App\Http\Controllers\API\PengajuanKalibrasiController;
use App\Http\Controllers\API\SerahTerimaController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\ApiController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [ApiAuthController::class, 'login']);

 Route::get('getkategorilab/{id}', [KategoriLabController::class, 'show']);
//Route::get('getlokasi', [LokasiController::class, 'index']);
Route::get('getlab', [LabController::class, 'index']);
Route::get('getlab/{id}', [LabController::class, 'getLabById']);
Route::get('getlaboratorium/{id}', [LabController::class, 'showbykategori']);
Route::get('getalat', [PeralatanController::class, 'getAllPeralatan']);
Route::get('getallalat/{idlab}', [PeralatanController::class, 'showbylab']);
Route::get('getalat/{id}', [PeralatanController::class, 'getPeralatanById']);
Route::get('getpage/{slug}', [PagesController::class, 'show']);

Route::middleware('auth:api')->group(function () {
    Route::post('/fetch-laboratorium-data', [ApiController::class, 'FetchLaboratoriumData']);
    Route::post('/fetch-peralatan-data', [ApiController::class, 'FetchPeralatanData']);

    Route::get('/get-user/{token}', [ApiAuthController::class, 'getUserInfo']);

    Route::get('/lab', [LabController::class, 'getAllLab']);
    Route::get('/lab/{id}',  [LabController::class,'getLabById']);
    Route::get('/peralatan', [PeralatanController::class, 'getAllPeralatan']);
    Route::get('/peralatan/{id}',  [PeralatanController::class,'getPeralatanById']);


    Route::resource('roles', RolesController::class);
    Route::resource('pages', PagesController::class);
    Route::resource('profile', ProfileController::class);
    Route::resource('kategorilab', KategoriLabController::class);
    Route::resource('lokasi', LokasiController::class);
    Route::resource('laboratorium', LaboratoriumController::class);
    Route::resource('mitra', MitraController::class);
    Route::resource('alat', AlatController::class);

    Route::resource('user', UserController::class);
});
