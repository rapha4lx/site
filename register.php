<?php
    session_start();

    if(isset($_SESSION['email']) && isset($_SESSION['pass'])   )
    {
        $_SESSION['logged'] = true;
        header('Location: produto.php');
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MoneyFlow Control</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css">
</head>

<body>
<div class="container">
    <header>
        <h2>MoneyFlow Control</h2>
        <div class="nav">
            <label for="toggle">&#9776;</label>
            <input type="checkbox" id="toggle">
            <div class="menu">
                <a href="index.php">Home</a>
                <a href="servico.php">Servi&ccedil;os</a>
                <a href="about.php">Sobre</a>
                <a href="contact.php">Contato</a>
            </div>
        </div>
    </header>

    <div class="mid-panel">

        <h1 class="mid-panel-titulo">Cadastro</h1>
        <form id="register_form" action="/" method="post">
            <div class="input-box">
                <span class="icon"><ion-icon name="mail"></ion-icon></span>
                <input type="text" id="email" required>
                <label>Email</label>
            </div>
            <div class="input-box">
                <span class="icon"><ion-icon name="lock-open"></ion-icon></span>
                <input type="password" id="password" required>
                <label>Password</label>
            </div>

            <div class="login-register">
                <p>Já tem uma conta?
                    <a href="login.php" class="login-Link">Entrar</a>
                </p>
            </div>
            <input type="submit" class="btn" id="Login" value="Cadastrar">
        </form>
    </div>
</div>  

    
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<script src="js/register.js"></script>


</body>
</html>