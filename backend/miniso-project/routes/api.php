<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\Frontend\WelcomeController;
use App\Http\Controllers\Frontend\PostShowController;


Route::get('/',WelcomeController::class);
Route::get('/posts/{ post:slug }',PostShowController::class);


Route::apiResource('/dashboard/posts', PostController::class)
    ->middleware(['auth:sanctum'])
    ->except(['create','edit']);



Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get(uri: '/users', action: function (Request $request){
    return User::all();
});