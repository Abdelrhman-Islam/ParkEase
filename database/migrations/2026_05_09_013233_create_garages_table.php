<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('garages', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->text  ('description')->nullable();
            $table->string('image')->nullable();
            // Map Location
            $table->decimal('lat', 10, 8)->nullable();
            $table->decimal('lng', 11, 8)->nullable();


            $table->string('address')->nullable();
            $table->string('city')->index()->nullable();
            $table->string('country')->nullable()->default('Egypt');

            $table->decimal('price', 10, 2);

            $table->time('opening_at')->nullable();
            $table->time('closing_at')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('garages');
    }
};
