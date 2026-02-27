<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'dish_id',
        'user_address',
        'status',
        'tx_hash',
        'amount',
        'quantity',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'quantity' => 'integer',
    ];

    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}
