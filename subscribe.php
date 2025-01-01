<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    // Add your subscription logic here
    // For example, save the email to a database or send a confirmation email
    echo "Subscription successful!";
} else {
    // Handle other request methods if necessary
    echo "Invalid request method.";
}
?>
