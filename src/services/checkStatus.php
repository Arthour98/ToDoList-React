<?php require_once "connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $task_id = $data["task_id"];
    $status = $data["status"];
    $sql = "UPDATE tasks
    SET status=:status WHERE task_id=:task_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":task_id", $task_id);
    $stmt->bindValue(":status", $status);

    if ($stmt->execute()) {
        echo json_encode(
            [
                "message" => "Task completed"
            ]
        );
    } else {
        echo json_encode(
            [
                "message" => "error"
            ]
        );
    }
}
