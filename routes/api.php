<?php

use App\Http\Controllers\Api\SuggestionController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;

Route::get('suggestions/with-comments', [SuggestionController::class, 'indexWithComments']);
Route::apiResource('suggestions', SuggestionController::class);
Route::apiResource('comments', CommentController::class);
