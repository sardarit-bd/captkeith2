<?php

namespace App\Enums;

enum RegistrableRole: string
{
    case Owner = 'owner';
    case Captain = 'captain';
    case Deckhand = 'deckhand';
    case Charterer = 'charterer';

    /**
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
