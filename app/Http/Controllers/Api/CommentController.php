<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Suggestion;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function index(Suggestion $suggestion): JsonResponse
    {
        return response()->json($suggestion->comments()->with('user:id,name')->latest()->get());
    }
    public function store(StoreCommentRequest $request, Suggestion $suggestion): JsonResponse
    {
        $comment = Comment::create([
            ...$request->validated(),
            'suggestion_id' => $suggestion->id,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($comment, 201);
    }
}
