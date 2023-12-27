<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ApiAuthController extends BaseController
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $response = Http::asForm()->post(config('oauth.access_token_url'), [

            'grant_type' => 'password',
            'client_id' => config('oauth.client_id'),
            'client_secret' => config('oauth.client_secret'),
            'username' => $request->input('username'),
            'password' => $request->input('password'),
            'scope' => '',

        ]);

        if ($response->successful()) {
            // Access token is retrieved successfully
            $accessToken = $response['access_token'];

            // Making a request to get user information using the obtained access token
            $apiResponse = Http::withHeaders([
                'Authorization' => 'Bearer ' . $accessToken,
            ])->get((env('API_AUTH')) . 'user/me');

            if ($apiResponse->successful()) {
                // Extract user data from the API response
                $userData = $apiResponse->json();

                // Create or update a local user based on the external API data
                $user = User::updateOrCreate(
                    ['userintra' => $userData['userData']['username']], // Use a field that uniquely identifies the user
                    [
                        'name' => $userData['pegawaiData']['name'],
                        // ... other user attributes
                    ]
                );

                // Log in the local user
                Auth::login($user);

                // Create a token for the authenticated user
                $token = $user->createToken($userData['userData']['username'] . '-' . now());

                // Building a success response with user information and token
                $success['accessToken'] = $token->accessToken;
                $success['ssoToken'] = $accessToken;
                $success['role'] = 'admin';
                $success['username'] = $userData['userData']['username'];
                $success['name'] = $userData['pegawaiData']['name'];


                // Returning the success response
                return $this->sendResponse($success, 'User login successfully.');
            } else {
                // Handle external API error
                return response()->json(['error' => 'Failed to retrieve user data from the external API'], 500);
            }
        } else {
            // Handle authentication failure
            return response()->json(['error' => 'Authentication failed'], 401);
        }
    }

    public function getUserInfo($token)
    {


        try {
            $response = Http::withToken($token)->get((env('API_AUTH')) . 'user/me');


            $response->throw(); // Throws an exception for non-successful responses

            return response()->json($response->json());
        } catch (\Exception $e) {
            // Handle the exception (log, return an error response, etc.)
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



}

