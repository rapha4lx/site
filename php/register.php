<?php
include ('connection.php');
include ('commands.php');

header('Content-Type: application/json');

$name = $_POST['name'];
$email = $_POST['email'];
$pass = $_POST['pass'];

if(empty($name) || empty($email) || empty($pass)){
    die(json_encode(""));
}

$sql_code = "SELECT `email` FROM `site_users` WHERE `email` = '$email';";
$sql_query = $mysqli->query($sql_code) or  die ("fail: ". $mysqli->error);
$arrow = mysqli_fetch_all($sql_query);

if($arrow[0] > 0){
    die(json_encode("Usuario ja existe"));
}

do{
    $tableName = RandomString(10);
    $sql_code = "SHOW TABLES LIKE '$tableName';";
    $sql_query = $mysqli->query($sql_code) or  die ("fail: ". $mysqli->error);
}while($sql_query->num_rows > 0);

$sql_code = "INSERT INTO `site_users` (`name`, `email`, `pass`, `db_name`) VALUES ('$name', '$email', '$pass', '$tableName');";
$mysqli->query($sql_code);

$sql_code = "CREATE TABLE {$tableName} (
    email varchar(1000),
    product varchar(255),
    value float,
    data varchar(255)
);";

$mysqli->query($sql_code);

echo json_encode("sucess");
?>