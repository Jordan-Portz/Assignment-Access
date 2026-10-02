<?php

namespace App\Enums;

enum SuggestionStatus: string
{
    case UnderReview = 'under_review';
    case Planned = 'planned';
    case Implemented = 'implemented';
    case Declined = 'declined';
}