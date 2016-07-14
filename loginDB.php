<?php
require("dbinfo.php");

$loginUser = $_POST['username'];
$pwUser = $_POST['password'];

echo "<html>";
echo "<br> user: $loginUser";
echo "<br> pw: $pwUser";


// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (mysqli_connect_errno()) {
    echo "<br> Failed to connect to MySQL: " . mysqli_connect_error();
} 

echo "</html>";


// checking the user
if($username){
	echo "hello";
	$username = mysqli_real_escape_string($conn,$loginUser);

	$password = mysqli_real_escape_string($conn,$pwUser);

	$sel_user = "select * from users where username='$username' AND pw='$password'";

	$run_user = mysqli_query($conn, $sel_user);
	echo "<br> $sel_user";
	$check_user = mysqli_num_rows($run_user);
	echo "<br> $check_user";
	if($check_user>0){
		$_SESSION['username']=$username;
		echo "<script>window.open('loadinfo.php','_self')</script>";
	}
	else {
		echo "<script>alert('Email or password is not correct, try again!')</script>";
	}
}
mysqli_close($conn);
?>