<?php

namespace App\Http\Requests;

use App\Enums\SuggestionStatus;
use App\Enums\SuggestionCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSuggestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'status' => ['required', Rule::enum(SuggestionStatus::class)],
            'category' => ['required', Rule::enum(SuggestionCategory::class)],
        ];
    }
}
