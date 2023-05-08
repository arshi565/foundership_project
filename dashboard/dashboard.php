<?php
// Connect to the database
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve the user's favorite currency exchange rates from the database
$user_id = $_SESSION['user_id'];
$sql = "SELECT * FROM favorite_rates WHERE user_id = $user_id LIMIT 5";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Display the favorite currency exchange rates
    echo "<ul>";
    while ($row = $result->fetch_assoc()) {
        echo "<li>" . $row["source_currency"] . " to " . $row["destination_currency"] . " - " . $row["rate"] . "</li>";
    }
    echo "</ul>";
} else {
    echo "You haven't added any favorite currency exchange rates yet.";
}

$conn->close();
?>
