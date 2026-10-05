<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
	public function login(Request $request): JsonResponse
	{
		$credentials = $request->validate([
			'email' => ['required', 'email'],
			'password' => ['required', 'string'],
		]);

		// $user = User::where('email', $request->email)->first();
		
		// if (!$user) {
		// 	throw ValidationException::withMessages([
		// 		'email' => ['The provided credentials are incorrect.'],
		// 	]);
		// }

		// Auth::login($user);

		// return response()->json([
		// 	'user' => $user
		// ]);
		if (!Auth::attempt($credentials)) {
        return response()->json([
            'message' => 'Invalid email or password'
        ], 401);
    }

    $request->session()->regenerate();

    return response()->json([
        'user' => Auth::user(),
    ]);
	}

	// public function logout(Request $request): JsonResponse
	// {
	// 	Auth::logout();

	// 	$request->session()->invalidate();
	// 	$request->session()->regenerateToken();

	// 	return response()->json(['message' => 'Logged out.']);
	// }

	public function user(Request $request): JsonResponse
	{
		return response()->json($request->user()?->only(['id', 'name', 'email']));
	}
}
