<?php
echo "hello";
include("dbinfo.php");

echo "testing";

$fnUser = $_POST['firstname'];
$lnUser = $_POST['lastname'];
$loginUser = $_POST['username'];
$pwUser = $_POST['password'];
echo "meow";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO users (firstname, lastname, username, pw)" .
" VALUES ('$fnUser', '$lnUser', '$loginUser', '$pwUser')";
echo "<br> $sql";
if ($conn->query($sql) === TRUE) {
    echo "New user created!";
    $_SESSION['username']=$username;
	echo "<script>window.open('login.php','_self')</script>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>