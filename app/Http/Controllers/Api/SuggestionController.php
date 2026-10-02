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
        return response()->json(Suggestion::latest()->get());
    }

    public function indexWithComments(): JsonResponse
    {
        return response()->json(Suggestion::with('comments')->latest()->get());
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

    // public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    // {
    //     $task->update($request->validated());

    //     return response()->json($task);
    // }

    public function destroy(Suggestion $suggestion): JsonResponse
    {
        $suggestion->delete();

        return response()->json(null, 204);
    }
}
