<?php
// check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // get form data and sanitize inputs
    $first_name = sanitize_input($_POST["first_name"]);
    $last_name = sanitize_input($_POST["last_name"]);
    $email = sanitize_input($_POST["email"]);
    $phone = sanitize_input($_POST["phone"]);
    $address = sanitize_input($_POST["address"]);
    $username = sanitize_input($_POST["username"]);
    $password = generate_password(); // call function to generate password

    // handle file upload
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["id_proof"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // check if file is an image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["id_proof"]["tmp_name"]);
        if($check === false) {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // check file size
    if ($_FILES["id_proof"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // allow certain file formats
    if ($imageFileType != "pdf" && $imageFileType != "doc" && $imageFileType != "docx" && $imageFileType != "jpg" && $imageFileType != "jpeg" && $imageFileType != "png") {
        echo "Sorry, only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed.";
        $uploadOk = 0;
    }

    // if file upload is ok, move the file to server and insert data into database
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["id_proof"]["tmp_name"], $target_file)) {
            // connect to database
            $servername = "localhost";
            $username_db = "username";
            $password_db = "password";
            $dbname = "money_transfer_portal";
            $conn = new mysqli($servername, $username_db, $password_db, $dbname);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // insert data into users table
            $sql = "INSERT INTO users (first_name, last_name, email, phone, address, username, password, id_proof)
            VALUES ('$first_name', '$last_name', '$email', '$phone', '$address', '$username', '$password', '$target_file')";
            if ($conn->query($sql) === TRUE) {
                // send email to user with username and password
                $to = $email;
                $subject = "Welcome to Online Money Transfer Portal";
                $message = "Dear $first_name,\n\nYour account has been created successfully.\n\nUsername: $username\nPassword: $password\n\nBest regards,\nOnline Money Transfer Portal";
                $headers = "From: no-reply@moneytransferportal.com" . "\r\n" .
                    "Reply-To: no-reply@moneytransferportal.com" . "\r\n" .
                    "X-Mailer: PHP/" . phpversion();
                mail($to, $subject, $message, $headers);

                // redirect user to login page
                header("Location: login.php
