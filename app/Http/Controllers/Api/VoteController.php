<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVoteRequest;
use App\Models\Suggestion;
use App\Models\Vote;
use Illuminate\Http\JsonResponse;

class VoteController extends Controller
{
	public function upsert(StoreVoteRequest $request, Suggestion $suggestion): JsonResponse
	{
		$vote = Vote::updateOrCreate(
			[
				'suggestion_id' => $suggestion->id,
				'user_id' => $request->user()->id,
			],
			['vote' => $request->validated()['vote']],
		);

		return response()->json($vote);
	}
}
