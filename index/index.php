<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <header>
        <h1>Welcome to my website!</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
    <main>
        <h2>Recent Posts</h2>
        <ul>
            <?php
            // connect to the database
            $conn = mysqli_connect('localhost', 'username', 'password', 'my_db');

            // check for errors
            if (!$conn) {
                die('Error connecting to database: ' . mysqli_connect_error());
            }

            // retrieve the recent posts from the database
            $query = "SELECT title, author, date FROM posts ORDER BY date DESC LIMIT 5";
            $result = mysqli_query($conn, $query);

            // loop through the results and display them
            while ($row = mysqli_fetch_assoc($result)) {
                echo '<li><a href="#">' . $row['title'] . '</a> by ' . $row['author'] . ' on ' . $row['date'] . '</li>';
            }

            // close the database connection
            mysqli_close($conn);
            ?>
        </ul>
    </main>
    <footer>
        <p>&copy; 2023 My Website</p>
    </footer>
    <script src="index.js"></script>
</body>
</html>
