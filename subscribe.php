<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    // Add your subscription logic here
    // For example, save the email to a database or send a confirmation email
    echo json_encode(["message" => "Subscription successful!"]);
} else {
    // Handle other request methods if necessary
    echo json_encode(["message" => "Invalid request method."]);
}
?>
