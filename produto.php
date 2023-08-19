<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MoneyFlow Control</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/produto.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.3/dist/chart.umd.min.js"></script>
</head>

<body>
<div class="container">
    <header>
        <h2>MoneyFlow Control</h2>
        <div class="nav">
            <label for="toggle">&#9776;</label>
            <input type="checkbox" id="toggle">
            <div class="menu">
                <!-- <a href="index.php">Home</a> -->
                <a href="servico.php">Servi&ccedil;os</a>
                <a href="about.php">Sobre</a>
                <a href="contact.php">Contato</a>
            </div>
        </div>
    </header>

    <div class="panel">
        <div class="panel_button">
            <button type="button" onclick="showAndHide('entrada')" class="btn">Entrada</button>
            <button type="button" onclick="showAndHide('saida')" class="btn">Saida</button>
            <button type="button" onclick="showAndHide('grafico')" class="btn">Graficos</button>
            <button type="button" onclick="showAndHide('AutoComplete')" class="btn">AutoComplete</button>
        </div>
        <div class="panel_button">
            <button type="button" id="AutoComplete" onclick="createPanel('criar produto')" class="btn">Criar Produto</button>
            <button type="button" id="entrada" onclick="createPanel('adicionar produto')" class="btn">Lançar Produto</button>
            <button type="button" id="AutoComplete" onclick="createPanel('criar saida')" class="btn">Criar Saida</button>
            <button type="button" id="saida" onclick="createPanel('adicionar saida')" class="btn">Lançar Saida</button>
        </div>
        
        <div class="panel_content">

            <div class="filters">
                <div class="input-box" style="width: 140px;">
                    <span class="icon"><ion-icon name="bag-add"></ion-icon></span>
                    <input type="text" id="produtoFilter" required>
                    <label>Produto</label>
                </div>
                
                <div class="input-box" style="width: 120px;">
                    <span class="icon"><ion-icon name="calendar"></ion-icon></span>
                    <input type="date" id="DataTermino" required></input>
                    <label>De</label>
                </div>


                <div class="input-box" style="width: 120px;">
                    <span class="icon"><ion-icon name="calendar"></ion-icon></span>
                    <input type="date" id="DataComeco" required></input>
                    <label>Até</label>
                </div>
                
              
                
                <select id="category">
                    <optgroup label="Produtos">
                        <option value="all">Todos</option>
                        <option value="release">Entrada</option>
                        <option value="out">Saida</option>
                    </optgroup>

                    <!-- <optgroup label="AutoComplete">
                        <option value="all_AutoComplete">Todos</option>
                        <option value="entrada_AutoComplete">Entrada</option>
                        <option value="saida_AutoComplete">Saida</option>
                    </optgroup> -->
                </select>
                

                <button class="btn_content" onclick="updateTable()">Filtrar</button>
            </div>


            
            <div id="table" class="contents">
                
                
            </div>
            




        </div>


        <div id="float_panel">

        </div>
    </div>




    

</div>  

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<script src="js/produto.js"></script>

</body>
</html>