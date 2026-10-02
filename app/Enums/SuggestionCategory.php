<?php

namespace App\Enums;

enum SuggestionCategory: string
{
    case Process = 'process';
    case Product = 'product';
    case MemberExperience = 'member_experience';
}