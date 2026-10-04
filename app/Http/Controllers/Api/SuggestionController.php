<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSuggestionRequest;
use App\Models\Suggestion;
use Illuminate\Http\JsonResponse;

class SuggestionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Suggestion::with('comments')->withCount([
                'votes as upvotes' => function ($query) {
                    $query->where('vote', 1);
                },
                'votes as downvotes' => function ($query) {
                    $query->where('vote', -1);
                }
            ])->withAggregate([
                'votes as user_vote' => function ($query) {
                    $query->where('user_id', 1);
                },
            ], 'vote')->latest()->get());
    }

    public function store(StoreSuggestionRequest $request): JsonResponse
    {
        $suggestion = Suggestion::create($request->validated());

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
