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
                <a href="index.html">Home</a>
                <a href="servico.html">Servi&ccedil;os</a>
                <a href="about.html">Sobre</a>
                <a href="contact.html">Contato</a>
            </div>
        </div>
    </header>

    <div class="mid-panel">

        <h1 class="mid-panel-titulo">Entrar</h1>
        <form id="login_form" action="/" method="post">
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
                <p>Ainda não tem uma conta?
                    <a href="register.html" class="login-Link">Cadastro</a>
                </p>
            </div>

            <input type="submit" class="btn" id="Register" value="Login">
        </form>
    </div>
</div>  

    
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<script src="js/login.js"></script>
</body>
</html>