<?php
$servername = "localhost"; // Your database server, usually localhost
$username = "your_username"; // Your MySQL username
$password = "your_password"; // Your MySQL password
$dbname = "hospital_management_system"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO Patient (ID_Type, ID_Number, Patient_Name, Gender, Disease, Room, Time, Deposit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssss", $idType, $idNumber, $patientName, $gender, $disease, $room, $time, $deposit);

// Set parameters and execute
$idType = $_POST['idType'];
$idNumber = $_POST['number'];
$patientName = $_POST['name'];
$gender = $_POST['gender'];
$disease = $_POST['disease'];
$room = $_POST['room'];
$time = date('Y-m-d H:i:s'); // Current time
$deposit = $_POST['deposit'];

if ($stmt->execute()) {
    // Redirect to the patient information page after adding the record
    header("Location: view_patient.php");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
