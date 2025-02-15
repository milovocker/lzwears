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

// Recibir y sanitizar datos
$newDNI = $_GET['dni'];
$newName = $_GET['username'];
$newEmail = $_GET['email'];
$newPassword = $_GET['password'];
$newIBAN = $_GET['iban'];
$newNumber = $_GET['phone'];

// Preparar y ejecutar la consulta segura
$stmt = $conn->prepare("INSERT INTO users (dni, name, email, password, IBAN, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $newDNI, $newName, $newEmail, $newPassword, $newIBAN, $newNumber);

if ($stmt->execute()) {
    echo 'REGISTERED!';
} else {
    echo 'ERROR: ' . $stmt->error;
}

$stmt->close();
$conn->close();
?>
