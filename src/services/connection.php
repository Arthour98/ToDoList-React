<?php
$username = "root";
$password = "1234";
$host = "localhost";
$dbname = "todo";

try {
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "ERROR:" . $e->getMessage();
    die();
}
http://localhost:3000/src/services/connection.php