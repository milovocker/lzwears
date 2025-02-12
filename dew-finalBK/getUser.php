<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "milosql";
$password = "Admin.1234";
$dbname = "LZWears";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$nameLogin = $_GET['username'];
$passwordLogin = $_GET['password'];

if (empty($nameLogin)) {
    die("Error: No username was introduced.");
} else if(empty($passwordLogin)) {
    die("Error: No password was introduced.");
}

// Prevenir inyección SQL
$stmt = $conn->prepare("SELECT password FROM users WHERE name = ?");
$stmt->bind_param("s", $nameLogin);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($dbPassword);
$stmt->fetch();

if ($stmt->num_rows > 0 && $dbPassword === $passwordLogin) {
    echo 'LOGGED IN';
} else {
    echo 'The password is not correct';
}

$stmt->close();
$conn->close();
?>