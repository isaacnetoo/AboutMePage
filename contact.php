<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Validate form data (add your validation logic here)
    $errors = [];
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    if (empty($email)) {
        $errors[] = "Email is required";
    }
    if (empty($message)) {
        $errors[] = "Message is required";
    }

    // If there are no validation errors, proceed with sending the email
    if (empty($errors)) {
        $to = "your_email@example.com"; // Replace with your email address
        $subject = "New message from $name";
        $body = "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Message:\n$message";

        // Send email
        if (mail($to, $subject, $body)) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send message. Please try again later.";
        }
    } else {
        // If there are validation errors, display them
        foreach ($errors as $error) {
            echo "$error<br>";
        }
    }
}
?>
