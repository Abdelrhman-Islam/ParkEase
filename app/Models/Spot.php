<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spot extends Model
{
    use HasFactory;

    protected $fillable = [
        'garage_id',
        'name',
        'floor',
        'status',
    ];


    public function garage() {
        return $this->belongsTo(Garage::class);
    }

    public function bookings() {
        return $this->hasMany(Booking::class);
    }
}
