<?php require_once "connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));


if ($data) {
    $user_id = $data["user_id"];
    $task_name = $data["task_name"];

    $sql = "INSERT INTO tasks(user_id,task_name)VALUES(
    :user_id,:task_name)";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":user_id", $user_id);
    $stmt->bindValue(":task_name", $task_name);

    if ($stmt->execute()) {
        echo json_encode(
            [
                "message" => "Task added succesfully"
            ]
        );
        exit;
    } else {
        echo json_encode(
            [
                "message" => "pizdets"
            ]
        );
        exit;
    }
}
