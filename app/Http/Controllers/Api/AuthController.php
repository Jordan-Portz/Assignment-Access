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

		if (!Auth::attempt($credentials)) {
        throw ValidationException::withMessages([
            'login' => ['Invalid email or password.'],
        ]);
    }

    $request->session()->regenerate();

    return response()->json([
        'user' => Auth::user(),
    ]);
	}

	public function logout(Request $request): JsonResponse
	{
		Auth::logout();

		$request->session()->invalidate();

		return response()->json(['message' => 'Logged out.']);
	}

	public function user(Request $request): JsonResponse
	{
		return response()->json($request->user()?->only(['id', 'name', 'email', 'is_admin']));
	}
}
