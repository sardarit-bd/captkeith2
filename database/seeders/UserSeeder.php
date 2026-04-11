<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's users in an idempotent way.
     */
    public function run(): void
    {
        $now = now();
        $password = Hash::make('password');

        DB::table('users')->upsert(
            [
                [
                    'id' => SeedIds::USER_TEST,
                    'email' => 'test@example.com',
                    'password' => $password,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::USER_OWNER,
                    'email' => 'owner@example.com',
                    'password' => $password,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::USER_CAPTAIN_1,
                    'email' => 'captain1@example.com',
                    'password' => $password,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::USER_CAPTAIN_2,
                    'email' => 'captain2@example.com',
                    'password' => $password,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::USER_DECKHAND_1,
                    'email' => 'deckhand1@example.com',
                    'password' => $password,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::USER_DECKHAND_2,
                    'email' => 'deckhand2@example.com',
                    'password' => $password,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::USER_CHARTERER,
                    'email' => 'charterer@example.com',
                    'password' => $password,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ],
            ['email'],
            ['password', 'is_active', 'updated_at']
        );
    }
}
