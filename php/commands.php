<?php

function RandomString($value){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = "";
    for ($i = 0; $i < $value; $i++) {
        $randstring = $randstring. $characters[rand(0, strlen($characters))];
    }
    return $randstring;
}




?>