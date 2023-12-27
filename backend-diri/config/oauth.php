<?php
// config/oauth.php

return [
    'client_id' => env('OAUTH_CLIENT_ID'),
    'client_secret' => env('OAUTH_CLIENT_SECRET'),
    'access_token_url' => env('OAUTH_ACCESS_TOKEN_URL'),
    'grant_type' => env('OAUTH_GRANT_TYPE'),
];
