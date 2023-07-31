<?php

$function = $_POST['function'];
$email = $_POST['email'];
$id = $_POST['id'];
$product = $_POST['product'];
$value = $_POST['value'];
$date = $_POST['date'];

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
}

function Login($email){
    include ('connection.php');
    include ('commands.php');

    if(empty($email)){
        die(json_encode("f1"));
    }
    
    $sql_code = "SELECT `db_name` FROM `site_users` WHERE `email` = '$email';";
    $sql_query = $mysqli->query($sql_code) ;//or  die ("fail: ". $mysqli->error);
    $arrow = mysqli_fetch_all($sql_query);
    
    if($arrow[0][0] < 1){
        die(json_encode("Usuario não existe"));
    }

    $db = $arrow[0][0];

    $sql_query = $mysqli->query("SELECT * FROM `$db`");
    $Array = array();
    
    while($row = mysqli_fetch_assoc($sql_query)){
        $Array[] = $row;
    }
    
    die (json_encode($Array));
}

function sugestions($email){
    include ('connection.php');
    include ('commands.php');

    if(empty($email)){
        die(json_encode("f1"));
    }

    $sql_code = "SELECT `db_name` FROM `site_users` WHERE `email` = '$email';";
    $sql_query = $mysqli->query($sql_code) ;//or  die ("fail: ". $mysqli->error);
    $arrow = mysqli_fetch_all($sql_query);
    
    if($arrow[0] < 1){
        die(json_encode("Usuario não existe"));
    }

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

    //$user_db_name = getDbName($email);

    //$sql_code = "DELETE FROM $user_db_name WHERE ID = '$id'";
    //$sql_query = $mysqli->query($sql_code); //or  die ("fail: ". $mysqli->error);

   // if($sql_query){
   //     echo json_encode("Deleted");
   // }else{
   //     echo json_encode("fail: ". $mysqli->error);
   // }

    $sql_code = "DELETE FROM `site_users_product` WHERE `ID` = '$id' AND `email` = '$email'";
    $sql_query = $mysqli->query($sql_code);

    if($sql_query){
        echo json_encode("Deleted");
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }

}

function sugestionsEdit($email, $id,$product, $value){
    include ('connection.php');
    include ('commands.php');

    // $user_db_name = getDbName($email);
    // $sql_code = "UPDATE `$user_db_name` SET `product`='$product', `value`= '$value', `date`= '$date' WHERE `ID` = '$id' ";
    // $sql_query = $mysqli->query($sql_code); //or die ("fail: ". $mysqli->error);
    // if($sql_query){
    //     echo json_encode("Edited");
    // }else{
    //     echo json_encode("fail: ". $mysqli->error);
    // }

    $sql_code = "UPDATE `site_users_product` SET `product`='$product', `value`= '$value' WHERE `ID` = '$id' AND `email` = '$email'";
    $sql_query = $mysqli->query($sql_code);

    if($sql_query){
        echo json_encode("Edited");
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }
}
function sugestionsAdd($email, $product, $value){
    include ('connection.php');
    include ('commands.php');

    // $user_db_name = getDbName($email);

    // $sql_code = "INSERT INTO `$user_db_name` (`product`, `value`, `date`) VALUES (`$product`, `$value`, `$date`)";
    // $sql_query = $mysqli->query($sql_code) or die ("fail: ". $mysqli->error);

    // if($sql_query){
    //     echo json_encode("Added");
    // }else{
    //     echo json_encode("fail: ". $mysqli->error);
    // }

    $sql_code = "INSERT INTO `site_users_product`(`email`, `product`, `value`) VALUES ('$email','$product','$value')";
    $sql_query = $mysqli->query($sql_code);

    if($sql_query){
        echo json_encode("Added");
    }else{
        echo json_encode("fail: ". $mysqli->error);
    }



}



?>