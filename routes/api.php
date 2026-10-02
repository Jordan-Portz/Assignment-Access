<?php

use App\Http\Controllers\Api\SuggestionController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;

Route::get('suggestions/with-comments', [SuggestionController::class, 'indexWithComments']);
Route::post('comments/{suggestion}', [CommentController::class, 'store']);
Route::apiResource('suggestions', SuggestionController::class);
Route::apiResource('comments', CommentController::class);
