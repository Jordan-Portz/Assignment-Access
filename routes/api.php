<?php

use App\Http\Controllers\Api\SuggestionController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\VoteController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);

// Vote
Route::put('/suggestions/{suggestion}/vote', [VoteController::class, 'upsert']);

// Comment
Route::post('/suggestions/{suggestion}/comments', [CommentController::class, 'store']);
Route::get('/suggestions/{suggestion}/comments',[CommentController::class, 'index']);

// Suggestion
Route::apiResource('suggestions', SuggestionController::class);
