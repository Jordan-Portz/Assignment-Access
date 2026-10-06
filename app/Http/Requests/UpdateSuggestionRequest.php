<?php

namespace App\Http\Requests;

use App\Enums\SuggestionStatus;
use App\Enums\SuggestionCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSuggestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'required', 'string'],
            'status' => ['sometimes', 'required', Rule::enum(SuggestionStatus::class)],
            'category' => ['sometimes', 'required', Rule::enum(SuggestionCategory::class)],
        ];
    }
}
