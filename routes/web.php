<?php

use Illuminate\Support\Facades\Route;

// Catch-all: let the React SPA handle all non-API routes
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');

