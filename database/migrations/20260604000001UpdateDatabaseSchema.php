<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename('owner_profiles', 'ownerProfiles');
        Schema::rename('charterer_profiles', 'chartererProfiles');
        Schema::rename('captain_profiles', 'captainProfiles');
        Schema::rename('deckhand_profiles', 'deckhandProfiles');
        Schema::rename('vessel_photos', 'vesselPhotos');
        Schema::rename('charter_events', 'charterEvents');
        Schema::rename('charter_crew_responses', 'charterCrewResponses');
        Schema::rename('charter_payments', 'charterPayments');
        Schema::rename('charter_hire_agreements', 'charterHireAgreements');

        Schema::table('vessels', function (Blueprint $table) {
            $table->renameColumn('owner_id', 'ownerId');
            $table->renameColumn('official_number', 'officialNumber');
            $table->renameColumn('length_ft', 'lengthFt');
            $table->renameColumn('beam_ft', 'beamFt');
            $table->renameColumn('draft_ft', 'draftFt');
            $table->renameColumn('vessel_type', 'vesselType');
            $table->renameColumn('marina_name', 'marinaName');
            $table->renameColumn('marina_address', 'marinaAddress');
            $table->renameColumn('marina_city', 'marinaCity');
            $table->renameColumn('marina_state', 'marinaState');
            $table->renameColumn('marina_zip', 'marinaZip');
            $table->renameColumn('operating_area', 'operatingArea');
            $table->renameColumn('requires_deckhand', 'requiresDeckhand');
            $table->renameColumn('required_license_type', 'requiredLicenseType');
            $table->renameColumn('required_endorsement', 'requiredEndorsement');
            $table->renameColumn('required_tonnage_rating', 'requiredTonnageRating');
            $table->renameColumn('required_years_experience', 'requiredYearsExperience');
            $table->renameColumn('is_active', 'isActive');
            $table->integer('passengerCapacity')->nullable();
        });

        Schema::table('vesselPhotos', function (Blueprint $table) {
            $table->renameColumn('vessel_id', 'vesselId');
            $table->renameColumn('image_path', 'imagePath');
            $table->renameColumn('display_order', 'displayOrder');
        });

        Schema::table('charterEvents', function (Blueprint $table) {
            $table->renameColumn('vessel_id', 'vesselId');
            $table->renameColumn('charterer_id', 'chartererId');
            $table->renameColumn('selected_captain_id', 'selectedCaptainId');
            $table->renameColumn('selected_deckhand_id', 'selectedDeckhandId');
            $table->renameColumn('charter_date', 'charterDate');
            $table->renameColumn('start_time', 'startTime');
            $table->renameColumn('duration_minutes', 'durationMinutes');
            $table->renameColumn('special_notes', 'specialNotes');
            $table->renameColumn('invite_token', 'inviteToken');
            $table->renameColumn('invite_token_expires_at', 'inviteTokenExpiresAt');
            $table->renameColumn('deleted_at', 'deletedAt');
        });

        Schema::table('charterCrewResponses', function (Blueprint $table) {
            $table->renameColumn('charter_event_id', 'charterEventId');
        });

        Schema::table('charterPayments', function (Blueprint $table) {
            $table->renameColumn('charter_event_id', 'charterEventId');
        });

        Schema::table('charterHireAgreements', function (Blueprint $table) {
            $table->renameColumn('charter_event_id', 'charterEventId');
        });
    }

    public function down(): void
    {
        // Reverse logic here if needed
    }
};