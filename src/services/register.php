<?php require_once "connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");


$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $name = $data["name"];
    $password = password_hash($data["password"], PASSWORD_DEFAULT);
    $sql = "INSERT INTO users(user_name,password)values(:name,:password)";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":name", $name);
    $stmt->bindValue(":password", $password);
    if ($stmt->execute()) {
        echo json_encode([
            "message" => "User created successfully"
        ]);
    }
    exit;
}
