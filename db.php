<?php

$host = "localhost"; // database host
$username = "your_username"; // database username
$password = "your_password"; // database password
$dbname = "your_database_name"; // database name

// Create connection
$conn = mysqli_connect($host, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
