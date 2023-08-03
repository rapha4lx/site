<?php

$function = $_POST['function'];
// $email = $_POST['email'];
$id = $_POST['id'];
$product = $_POST['product'];
$value = $_POST['value'];
$date = $_POST['date'];

session_start();

$email = $_SESSION['email'];

if(!$_SESSION['logged'] && isset($email)){
    die(json_encode("You are not logged"));
}

switch ($function){
    case 'login':
        Login($email);
    break;

    case 'sugestions':
        sugestions($email);
        break;

    case 'sugestionsDelete':
        sugestionsRemove($email,$id);
        break;

    case 'sugestionsEdit':
        sugestionsEdit($email,$id,$product,$value);
        break;

    case 'sugestionsAdd':
        sugestionsAdd($email, $product, $value);
        break;

    case 'releaseAdd':
        releaseAdd($email, $product, $value, $date);
    break;
    
    case 'releaseDelete':
        releaseRemove($email, $id);
        break;
    
    case'releaseEdit':
        releaseEdit($email,$id,$product,$value,$date);
    break;    

}

function Login($email){
    include ('connection.php');
    include ('commands.php');


    $user_db_name = getDbName($email);

    // $sql_code = "SELECT `db_name` FROM `site_users` WHERE `email` = '$email';";
    // $sql_query = $mysqli->query($sql_code) ;//or  die ("fail: ". $mysqli->error);
    // $arrow = mysqli_fetch_assoc($sql_query);
    
    // if(!isset($arrow["db_name"])){
    //     die(json_encode("Usuario não existe"));
    // }

    // $db = $arrow["db_name"];

    $sql_query = $mysqli->query("SELECT * FROM `$user_db_name`");
    $Array = array();
    
    while($row = mysqli_fetch_assoc($sql_query)){
        $Array[] = $row;
    }
    
    die (json_encode($Array));
}

function sugestions($email){
    include ('connection.php');
    include ('commands.php');

    $user_db_name = getDbName($email);

    // $sql_code = "SELECT `db_name` FROM `site_users` WHERE `email` = '$email';";
    // $sql_query = $mysqli->query($sql_code) ;//or  die ("fail: ". $mysqli->error);
    // $arrow = mysqli_fetch_all($sql_query);
    
    // if($arrow[0] < 1){
    //     die(json_encode("Usuario não existe"));
    // }

    $sql_query = $mysqli->query("SELECT `ID`, `product`, `value` FROM `site_users_product` WHERE `email` = '$email';");

    $Array = array();

    while($row = mysqli_fetch_assoc($sql_query)){
        $Array[] = $row;
    }

    die (json_encode($Array));
}

function sugestionsRemove($email, $id){
    include ('connection.php');
    include ('commands.php');

    $sql_code = "DELETE FROM `site_users_product` WHERE `ID` = '$id' AND `email` = '$email'";
    $sql_query = $mysqli->query($sql_code);
    if($sql_query){
        $lastID = mysqli_insert_id($mysqli);
        $json_obj = array("status" => "Deleted", "ID" => $lastID);
        echo json_encode($json_obj);
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }
}

function releaseRemove($email, $id){
    include ('connection.php');
    include ('commands.php');

    $user_db_name = getDbName($email);
    $sql_code = "DELETE FROM $user_db_name WHERE ID = '$id'";
    $sql_query = $mysqli->query($sql_code); //or  die ("fail: ". $mysqli->error);
    if($sql_query){
        $json_obj = array("status" => "Deleted");
        echo json_encode($json_obj);
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }
}

function sugestionsEdit($email, $id,$product, $value){
    include ('connection.php');
    include ('commands.php');

    $sql_code = "UPDATE `site_users_product` SET `product`='$product', `value`= '$value' WHERE `ID` = '$id' AND `email` = '$email'";
    $sql_query = $mysqli->query($sql_code);

    if($sql_query){
        $lastID = mysqli_insert_id($mysqli);
        $json_obj = array("status" => "Edited", "ID" => $lastID);
        echo json_encode($json_obj);
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }
}

function releaseEdit($email, $id, $product, $value, $date){
    include ('connection.php');
    include ('commands.php');

    $user_db_name = getDbName($email);
    $sql_code = "UPDATE `$user_db_name` SET `product`='$product', `value`= $value, `date`= '$date' WHERE `ID` = $id ";
    $sql_query = $mysqli->query($sql_code); //or die ("fail: ". $mysqli->error);
    if($sql_query){
        $lastID = mysqli_insert_id($mysqli);
        $json_obj = array("status" => "Edited", "ID" => $lastID);
        echo json_encode($json_obj);
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }
}

function sugestionsAdd($email, $product, $value){
    include ('connection.php');
    include ('commands.php');

    $sql_code = "INSERT INTO `site_users_product`(`email`, `product`, `value`) VALUES ('$email','$product','$value')";
    $sql_query = $mysqli->query($sql_code);
    if($sql_query){
        $lastID = mysqli_insert_id($mysqli);
        $json_obj = array("status" => "Added", "ID" => $lastID);
        echo json_encode($json_obj);
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }
}

function releaseAdd($email, $product, $value, $date){
    include ('connection.php');
    include ('commands.php');

    $user_db_name = getDbName($email);

    $sql_code = "INSERT INTO `$user_db_name` (`product`, `value`, `date`) VALUES ('$product', $value, '$date')";
    $sql_query = $mysqli->query($sql_code); //or die (json_encode($mysqli->error));
    
    if($sql_query && mysqli_affected_rows($mysqli) > 0){
        $lastID = mysqli_insert_id($mysqli);
        $json_obj = array("status" => "Added", "ID" => $lastID);
        echo json_encode($json_obj);
    }else{
        echo json_encode("fail");
    }
}



?>