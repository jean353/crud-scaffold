<?php

use App\Http\Controllers\DishController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - StarkFood
|--------------------------------------------------------------------------
*/

// Public menu routes
Route::get('/dishes', [DishController::class, 'index']);
Route::get('/dishes/{dish}', [DishController::class, 'show']);

// Orders
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/orders/{order}', [OrderController::class, 'show']);
