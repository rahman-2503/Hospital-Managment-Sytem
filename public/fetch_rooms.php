<?php
// Database configuration
$servername = "localhost:3000"; // Change if your server is different
$username = "root"; // Change to your database username
$password = "rahman"; // Change to your database password
$dbname = "hospital_management_system"; // Change to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch room data
$sql = "SELECT room_no, availability, price, bed_type FROM rooms"; // Adjust table name and column names as necessary
$result = $conn->query($sql);

// Check if there are results and output data for each row
if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . htmlspecialchars($row['room_no']) . "</td>";
        echo "<td>" . htmlspecialchars($row['availability']) . "</td>";
        echo "<td>" . htmlspecialchars($row['price']) . "</td>";
        echo "<td>" . htmlspecialchars($row['bed_type']) . "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='4'>No rooms available</td></tr>";
}

$conn->close();
?>
