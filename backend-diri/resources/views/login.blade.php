<!-- resources/views/login.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>

    <h1>Login</h1>

    @if(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @endif

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Login</button>
    </form>

</body>
</html>
