<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request): JsonResponse
    {
        $comment = Comment::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return response()->json($comment, 201);
    }

    public function destroy(Comment $comment): JsonResponse
    {
        $comment->delete();

        return response()->json(null, 204);
    }
}
