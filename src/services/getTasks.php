<?php

require_once "connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $user_id = $data["user_id"];
    $sql = "SELECT * FROM tasks
    WHERE user_id=:user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":user_id", $user_id);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    }
    exit;
}
