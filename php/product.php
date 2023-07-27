<?php


if(isset($_POST['function']) || isset($_POST['email']))
{
    
}

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

    case 'delete':
        Remove($email,$id);
        break;

    case 'edit':
        Edit($email,$id,$product,$value,$date);
        break;

    case 'add':
        Add($email, $product, $value, $date);
        break;
}

function Login($email){
    include ('connection.php');
    include ('commands.php');

    if(empty($email)){
        die(json_encode(""));
    }
    
    $sql_code = "SELECT `email` FROM `site_users` WHERE `email` = '$email';";
    $sql_query = $mysqli->query($sql_code) or  die ("fail: ". $mysqli->error);
    $arrow = mysqli_fetch_all($sql_query);
    
    if($arrow[0] <= 0){
        die(json_encode("Usuario não existe"));
    }
    
    $sql_query = $mysqli->query("SELECT * FROM o8fFxWvX9");
    
    $Array = array();
    
    while($row = mysqli_fetch_assoc($sql_query)){
        $Array[] = $row;
    }
    
    die (json_encode($Array));
}

function Remove($email, $id){
    include ('connection.php');
    include ('commands.php');




}

function Edit($email, $id,$product, $value, $date){
    include ('connection.php');
    include ('commands.php');

    


}

function Add($email, $product, $value, $date){
    include ('connection.php');
    include ('commands.php');



}



?>