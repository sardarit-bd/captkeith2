<?php

namespace App\DataTransferObjects;

class DashboardViewData
{
    /**
     * @param array<string, mixed> $props
     */
    public function __construct(
        public readonly string $component,
        public readonly array $props = [],
    ) {
    }
}

