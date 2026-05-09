<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'spot_id',
        'status',
        'booking_date',
        'start_time',
        'end_time',
    ];
    protected $keyType = 'string';
    public $incrementing = false;


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function vehicle() {
        return $this->belongsTo(Vehicle::class);
    }

    public function spot() {
        return $this->belongsTo(Spot::class);
    }

    public function payment() {
        return $this->hasOne(Payment::class);
    }
}
