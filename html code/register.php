<?php
// Connect to the database
$conn = mysqli_connect("localhost", "username", "password", "database_name");

// Get the user input
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$email = $_POST["email"];
$password = $_POST["password"];
$address = $_POST["address"];
$phone = $_POST["phone"];

// Validate the input
if (empty($firstname) || empty($lastname) || empty($email) || empty($password) || empty($_FILES["idproof"]["name"])) {
	die("Error: All fields are required");
}

// Upload the file
$target_dir = "uploads/" . $email . "/";
if (!is_dir($target_dir)) {
	mkdir($target_dir);
}
$target_file = $target_dir . basename($_FILES["idproof"]["name"]);
move_uploaded_file($_FILES["idproof"]["tmp_name"], $target_file);

// Insert the user details into the database
$sql = "INSERT INTO users (firstname, lastname, email, password, address, phone, idproof) VALUES ('$firstname', '$lastname', '$email', '$password', '$address', '$phone', '$target_file')";
mysqli_query($conn, $sql);

// Send an email with the username and password
$to = $email;
$subject = "Registration Successful";
$message = "Dear $firstname $lastname,\n\nYour account has been successfully registered.\n\nUsername: $email\nPassword: $password\n\nThank you for choosing our service.";
$headers
