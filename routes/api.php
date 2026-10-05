<?php

use App\Http\Controllers\Api\SuggestionController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\VoteController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login']);

Route::put('/suggestions/{suggestion}/vote', [VoteController::class, 'upsert']);

Route::apiResource('suggestions', SuggestionController::class);
Route::apiResource('comments', CommentController::class);
Route::apiResource('votes', VoteController::class);
