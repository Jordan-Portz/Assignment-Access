<?php

use App\Http\Controllers\Api\SuggestionController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\VoteController;
use Illuminate\Support\Facades\Route;

Route::apiResource('suggestions', SuggestionController::class);
Route::apiResource('comments', CommentController::class);
Route::apiResource('votes', VoteController::class);
