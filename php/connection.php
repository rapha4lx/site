<?php
define('HOST','mysql670.umbler.com');
define('USER','radiation_admin');
define('PASS','xjh6pBiMoqKWg8');
define('DB','radiationproject');

$mysqli = new mysqli(HOST,USER,PASS,DB);
if($mysqli->error){
    die ("Falha na conexão: " .$mysqli->connect_error);
}
?>