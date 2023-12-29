<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userRole = $request->user()->role()->first();
        if ($userRole) {

            // Set scope as admin/moderator based on user role
            $request->request->add([
                'scope' => $userRole->name
            ]);
        }

        return $next($request);
    }
}
