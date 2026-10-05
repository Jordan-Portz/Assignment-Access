<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSuggestionRequest;
use App\Models\Suggestion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SuggestionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()?->id;

        return response()->json(Suggestion::with([
                'user:id,name',
            ])->withCount([
                'comments',
                'votes as upvotes' => fn ($query) => $query->where('vote', 1),
                'votes as downvotes' => fn ($query) => $query->where('vote', -1),
            ])->withAggregate([
                'votes as user_vote' => function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                },
            ], 'vote')->latest()->get());
    }

    public function store(StoreSuggestionRequest $request): JsonResponse
    {
        $suggestion = Suggestion::create([
            ...$request->validated(),
            'user_id' => $request->user()->id,
        ]);

        return response()->json($suggestion, 201);
    }

    public function show(Suggestion $suggestion): JsonResponse
    {
        return response()->json($suggestion);
    }

    public function destroy(Suggestion $suggestion): JsonResponse
    {
        $suggestion->delete();

        return response()->json(null, 204);
    }
}
