<?php
define('HOST','');
define('USER','');
define('PASS','');
define('DB','');

$mysqli = new mysqli(HOST,USER,PASS,DB);
if($mysqli->error){
    die ("Falha na conexão: " .$mysqli->connect_error);
}
?>
