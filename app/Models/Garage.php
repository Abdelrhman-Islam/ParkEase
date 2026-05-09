<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Garage extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'image',
        'lat',
        'lng',
        'address',
        'city',
        'country',
        'price',
        'opening_at',
        'closing_at',
        'is_active',
    ];




    
    public function owner() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function spots() {
        return $this->hasMany(Spot::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    // علاقة غير مباشرة لجلب كل حجوزات الجراج
    public function bookings() {
        return $this->hasManyThrough(Booking::class, Spot::class);
    }
}

