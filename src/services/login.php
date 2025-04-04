<?php require_once "connection.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");


$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $name = $data["name"];
    $password = $data["password"];


    $sql = "SELECT * from users WHERE user_name=:name";
    $stmt = $conn->prepare($sql);
    $stmt->bindValue(":name", $name);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["password"])) {
        echo json_encode(
            [
                "message" => "Login successfull",
                "user_id" => $user["user_id"],
                "user_name" => $user["user_name"]
            ]

        );
    } else {
        echo json_encode([
            "message" => "Invalid username or password"
        ]);
    }
    exit;
}
