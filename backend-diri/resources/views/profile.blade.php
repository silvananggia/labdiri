<!-- resources/views/profile.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
</head>
<body>

    <h1>User Profile</h1>

    @if(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @else
        <p>Welcome, {{ $user['name'] }}!</p>
        <p>Email: {{ $user['email'] }}</p>
        <!-- Add other profile details as needed -->
    @endif

</body>
</html>
