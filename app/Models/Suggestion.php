<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Suggestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'category',
    ];

    protected $casts = [
        'status' => \App\Enums\SuggestionStatus::class,
        'category' => \App\Enums\SuggestionCategory::class
    ];

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(Vote::class);
    }
}
