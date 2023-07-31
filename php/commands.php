<?php

function RandomString($value){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = "";
    for ($i = 0; $i < $value; $i++) {
        $randstring = $randstring. $characters[rand(0, strlen($characters))];
    }
    return $randstring;
}

function getDbName($email){
    include('connection.php');

    if(empty($email)){
        die(json_encode("f1"));
    }
    
    $sql_code = "SELECT `db_name` FROM `site_users` WHERE `email` = '$email';";
    $sql_query = $mysqli->query($sql_code) ;//or  die ("fail: ". $mysqli->error);
    $arrow = mysqli_fetch_all($sql_query);
    
    if($arrow[0][0] < 1){
        die(json_encode("Usuario não existe"));
    }

    return $arrow[0][0];;
}


?>