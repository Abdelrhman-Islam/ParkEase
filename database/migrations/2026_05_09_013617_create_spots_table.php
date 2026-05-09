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
        Schema::create('spots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('garage_id')->constrained('garages')->onDelete('cascade');
            $table->string   ('name')->index();
            $table->string   ('floor')->nullable();
            $table->enum     ('status', ['available', 'occupied', 'maintenance'])->index()->default('available');

            $table->timestamps();

            $table->unique(['garage_id', 'name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spots');
    }
};
