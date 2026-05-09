<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'garage_id',
        'rating',
        'comment',
    ];

    
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function garage() {
        return $this->belongsTo(Garage::class);
    }
}
