<?php
include ('connection.php');

header('Content-Type: application/json');

$email = $_POST['email'];
$pass = $_POST['pass'];
$name = "";

$sql_code = "SELECT `email`, `pass`, `name` FROM `site_users` WHERE `email` = '$email' AND `pass` = '$pass'";
$sql_query = $mysqli->query($sql_code) or  die ("fail: ". $mysqli->error);
$arrow = mysqli_fetch_assoc($sql_query);

if(empty($arrow['email'])){
    die(json_encode("User or password not match"));
}

$name = $arrow["name"];
echo json_encode("$name");
?>