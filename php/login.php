<?php
include ('connection.php');

header('Content-Type: application/json');

session_start();

$email = $mysqli->real_escape_string($_POST['email']);
$pass = $mysqli->real_escape_string($_POST['pass']);

$sql_code = "SELECT `email`, `pass` FROM `site_users` WHERE `email` = '$email' AND `pass` = '$pass'";
$sql_query = $mysqli->query($sql_code) or  die ("fail: ". $mysqli->error);
$arrow = mysqli_fetch_assoc($sql_query);

if(empty($arrow['email'])){
    die(json_encode("User or password not match"));
}

$email = $arrow["email"];
$pass = $arrow["pass"];

$_SESSION['email'] = $email;
$_SESSION['pass'] = $pass;
$_SESSION['logged'] = true;

header("Location: ../produto.php");
exit();
?>