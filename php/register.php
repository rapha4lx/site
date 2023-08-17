<?php
include ('connection.php');
include ('commands.php');

session_start();

header('Content-Type: application/json');

$name = $mysqli->real_escape_string($_POST['name']);
$email = $mysqli->real_escape_string($_POST['email']);
$pass = $mysqli->real_escape_string($_POST['pass']);

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
    ID INT(11) NOT NULL AUTO_INCREMENT,
    product VARCHAR(1000),
    value FLOAT NULL,
    desconto FLOAT NULL,
    date VARCHAR(255),
    PRIMARY KEY (ID),
    status VARCHAR(50)
);";
$mysqli->query($sql_code);

$_SESSION['email'] = $email;
$_SESSION['pass'] = $pass;
$_SESSION['logged'] = true;

header('Location: product.php');
exit();

//echo json_encode("sucess");
?>