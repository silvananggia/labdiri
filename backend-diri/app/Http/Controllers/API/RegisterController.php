<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use App\Models\Roles;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\TemporaryPasswordMail;

class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'organisasi' => 'required',
            'akses' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }




        $plaintext = Str::random(12);
        $hashedPassword = bcrypt($plaintext);

        if ($request->organisasi == "Non-BRIN" || $request->akses == "public" ) {
            $user = User::create([
                'name' => request('name'),
                'email' => request('email'),
                'password' => $hashedPassword // Generate a temporary password
            ]);

            $Roles = Roles::create([
                'user_id' => $user->id,
                'role' => "public",
                'isVerified' => "1"
            ]);

            $success['accessToken'] = $user->createToken('MyApp')->accessToken;
            $success['name'] = $user->name;

        } else {
            $user = User::create([
                'name' => request('name'),
                'email' => request('email'),
                'password' => $hashedPassword // Generate a temporary password
            ]);

            $Roles = Roles::create([
                'user_id' => $user->id,
                'role' => $request->akses,
                'lab_id' => $request->idlab,
                'isVerified' => "0"
            ]);

            $success['accessToken'] = $user->createToken('MyApp')->accessToken;
            $success['name'] = $user->name;
        }
        // Validate user input and create a new user


        // Send the temporary password via email
        Mail::to($user->email)->send(new TemporaryPasswordMail($user, $plaintext));

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */

    public function login(Request $request): JsonResponse
{
    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        $user = Auth::user();

        // Check if the user's role is verified
        $userRole = $user->role()->first();

        if ($userRole && $userRole->isVerified == 1) {
            // User is verified, continue with login process

            $user = Auth::user();
            $userRole = $user->role()->first();

            if ($userRole) {
                $this->scope = $userRole->role;
            }
            $token = $user->createToken($user->email . '-' . now(), [$this->scope]);
            $success['accessToken'] = $token->accessToken;
            $success['name'] = $user->name;
            $success['email'] = $user->email;
            $success['role'] = $user->role()->first()->role;
            $success['laboratorium'] = $user->role()->first()->lab_id;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            // User is not verified, return an error
            return $this->sendError('Unauthorised', ['error' => 'Akun anda dalam tahap verifikasi']);
        }
    } else {
        return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
    }
}

    public function logout()
    {
        if (Auth::check()) {
            $token = Auth::user()->token();
            $token->revoke();
            return $this->sendResponse(null, 'User is logout');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised'], Response::HTTP_UNAUTHORIZED);
        }
    }
}
