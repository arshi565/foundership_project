<?php
session_start();
if(!isset($_SESSION['username'])){
    header("Location: login.php");
}

// include database connection code
include_once('db.php');

// retrieve user's information from the database
$username = $_SESSION['username'];
$sql = "SELECT * FROM users WHERE username='$username'";
$result = mysqli_query($conn, $sql);
$user = mysqli_fetch_assoc($result);

// retrieve exchange rates from the database
$sql = "SELECT * FROM exchange_rates";
$result = mysqli_query($conn, $sql);
$rates = mysqli_fetch_all($result, MYSQLI_ASSOC);

// retrieve user's favorite exchange rate combinations from the database
$sql = "SELECT * FROM favorites WHERE username='$username'";
$result = mysqli_query($conn, $sql);
$favorites = mysqli_fetch_all($result, MYSQLI_ASSOC);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard - Online Money Transfer Portal</title>
</head>
<body>
    <h1>Welcome <?php echo $user['full_name']; ?> to your Dashboard</h1>
    <h3>Your Details</h3>
    <p>Full Name: <?php echo $user['full_name']; ?></p>
    <p>Email: <?php echo $user['email']; ?></p>
    <p>ID Proof: <a href="<?php echo $user['id_proof_file_path']; ?>">View File</a></p>
    
    <h3>Currency Exchange Rates</h3>
    <table>
        <thead>
            <tr>
                <th>Source Currency</th>
                <th>Destination Currency</th>
                <th>Rate</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($rates as $rate): ?>
                <tr>
                    <td><?php echo $rate['source_currency']; ?></td>
                    <td><?php echo $rate['destination_currency']; ?></td>
                    <td><?php echo $rate['rate']; ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <h3>Favorite Exchange Rates</h3>
    <table>
        <thead>
            <tr>
                <th>Source Currency</th>
                <th>Destination Currency</th>
                <th>Rate</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($favorites as $favorite): ?>
                <?php 
                    $source_currency = $favorite['source_currency'];
                    $destination_currency = $favorite['destination_currency'];
                    $sql = "SELECT * FROM exchange_rates WHERE source_currency='$source_currency' AND destination_currency='$destination_currency'";
                    $result = mysqli_query($conn, $sql);
                    $rate = mysqli_fetch_assoc($result);
                ?>
                <tr>
                    <td><?php echo $rate['source_currency']; ?></td>
                    <td><?php echo $rate['destination_currency']; ?></td>
                    <td><?php echo $rate['rate']; ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <form action="logout.php" method="post">
        <button type="submit">Logout</button>
    </form>
</body>
</html>
