<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Post extends Model
{
    protected $fillable = ['title','slug','body','is_published'];

    protected $casts = [            //attribute casting.
        'is_published' => 'boolean',
    ];

    public function users(){
        return $this->belongsTo(User::class);
    }
}
