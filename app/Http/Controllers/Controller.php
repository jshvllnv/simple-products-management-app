<?php

namespace App\Http\Controllers;

use App\Http\Middleware\CorsMiddleware;

abstract class Controller
{
    public function __construct()
    {
        $this->middleware(CorsMiddleware::class);
    }
}
