<?php
    session_start();


    if(!$_SESSION['logged']){
        header('Location: index.php');
        exit();
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/product.css">

    <script src="
https://cdn.jsdelivr.net/npm/chart.js@4.3.3/dist/chart.umd.min.js
"></script>

    
</head>

<body>

    <header>
        <h2 class="logo">Logo</h2>
        <nav class="navigation">
            <a href="#">About</a>
            <a href="#">Service</a>
            <a href="#">Contact</a>
        </nav>
    </header>

<div class="main">
    
    <div id="myLeftPanel" class="leftPanel">
        <button id="entrada" class="panelButton">Entrada</button>
        <button id="saida" class="panelButton">Saida</button>
        <button id="Graficos" class="panelButton">Graficos</button>    
    </div>
        
    <div id="midPanel" class="midPanel">
            
        <div id="entrada" class="entrada">
            <div class="buttons">
                <button id="btnCriarProduto" class="btn">Criar produto</button>
                <button id="btnLancarProduto" class="btn">Lançar produto</button>
                <button id="btnFilter" class="btn">Filtrar</button>
                <div> 
                    <h2>De</h2>
                    <input type="date" id="dataFilterIn" name="data" class="date" required></input>
                </div>
                <div> 
                    <h2>Ate</h2>
                    <input type="date" id="dataFilterUntil" name="data" class="date" required></input>
                </div>
            </div>
            
            <div class="wrapper-addProduct">
                <span class="icon-close"><ion-icon name="close"></ion-icon></span>
                <div class="form-box addProduct">
                    <h2>Criar Produto</h2>
                    <form id="addProduct">
                        
                        <div class="input-box">
                            <span class="icon"><ion-icon name="bag-add"></ion-icon></span>
                            <input type="text" class="product" required>
                            <div class="suggestions"></div>
                            <label>Produto</label>
                        </div>

                        <div class="input-box">
                            <span class="icon"><ion-icon name="card"></ion-icon></span>
                            <input type="any" step="0.01" min="0.00" max="9999.99" class="valor" required>
                            <label>Valor</label>
                        </div>

                        <button type="submit" value="sugestionsAdd" class="btn">
                            <span >Adicionar</span>
                        </button>

                        <button type="submit" value="sugestionsEdit" class="btn">
                            <span >Editar</span>
                        </button>

                        <button type="submit" value="sugestionsDelete" class="btn">
                            <span >Deletar</span>
                        </button>

                    </form>
                </div>
            </div>

                 <!-- Second Form -- Buttom -->
                 
                 <div class="wrapper-releaseProduct">
                     <span class="icon-close"><ion-icon name="close"></ion-icon></span>
                     <div class="form-box releaseProduct">
                         <h2>Lançar Produto</h2>
                    <form id="releaseProduct">
                        
                        <div class="input-box">
                            <span class="icon"><ion-icon name="bag-add"></ion-icon></span>
                            <input type="text" class="product" autocomplete="on" required>
                            <div class="suggestions"></div>
                            <label>Produto</label>
                        </div>

                        <div class="input-box">
                            <span class="icon"><ion-icon name="card"></ion-icon></span>
                            <input type="any" step="0.01" min="0.00" max="9999.99" class="valor" required>
                            <label>Valor</label>
                        </div>
                        
                        <div class="input-box">
                            <span class="icon"><ion-icon name="calendar"></ion-icon></span>
                            <input type="date" id="data" name="data" required></input>
                            <label>Data</label>
                        </div>
                        
                        <button type="submit" value="releaseProduct" class="btn">
                            <span >Adicionar</span>
                        </button>
                        
                        
                    </form>
                </div>
            </div>
            
            <!-- Thirt Form -- Buttom -->

            <div class="wrapper-editProduct">
                <span class="icon-close"><ion-icon name="close"></ion-icon></span>
                 <div class="form-box editProduct">
                    <h2>Editar Produto</h2>
                    <form id="editProduct">
                        
                        <div class="input-box">
                            <span class="icon"><ion-icon name="bag-add"></ion-icon></span>
                            <input type="text" class="product" autocomplete="on" required>
                            <div class="suggestions"></div>
                            <label>Produto</label>
                        </div>

                        <div class="input-box">
                            <span class="icon"><ion-icon name="card"></ion-icon></span>
                            <input type="any" step="0.01" min="0.00" max="9999.99" class="valor" required>
                            <label>Valor</label>
                        </div>

                        <div class="input-box">
                            <span class="icon"><ion-icon name="calendar"></ion-icon></span>
                            <input type="date" id="data" name="data" required></input>
                            <label>Data</label>
                        </div>
                        
                        <button type="submit" value="releaseEdit" class="btn">
                            <span>Editar</span>
                        </button>

                    </form>
                </div>
            </div>

            <div id="table" class="table">

            </div>  
                  
        </div>

    </div>        

</div>


    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/product.js"></script>


    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>

</html>