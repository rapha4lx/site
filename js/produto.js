
var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;       
document.getElementById("DataComeco").value = today;
document.getElementById("DataTermino").value = "2010-01-01";




let array = [];
let rowsReleaseCount = 0;
let rowsOutCount = 0;

let selectedEditID = 0;
let selectedDivID = 0;
let Status = "release"; 

$('document').ready(function(){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'login'},
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);

            for(let i in jsonObject){            
            if(jsonObject[i].status == Status){
               array.push({ID: jsonObject[i].ID, product: jsonObject[i].product, value: jsonObject[i].value, date: jsonObject[i].date, status: jsonObject[i].status});
                    if(rowsReleaseCount & 1){
                        $('#table').prepend('<div class="rows" data-id='+ jsonObject[i].ID +'> <label>Entrada</label> <label>' + jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button class="btn_content" data-id='+ jsonObject[i].ID + '>edit</button><button class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                    }else{
                        $('#table').prepend('<div class="rows pair" data-id='+ jsonObject[i].ID +'> <label>Entrada</label> <label>'+ jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button class="btn_content" data-id='+ jsonObject[i].ID +' >edit</button><button class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                    }
                    rowsReleaseCount++;
                }else{
                 array.push({ID: jsonObject[i].ID, product: jsonObject[i].product, value: jsonObject[i].value, date: jsonObject[i].date, status: jsonObject[i].status});
                    rowsOutCount++;
                }
            }

            $(document).on('click', '.btn_edit', function() {
                let btnIndex = parseInt($(this).attr('data-id'));
                let index = array.findIndex(array => array.ID ==  btnIndex);

                console.log("btnIndex: " + btnIndex);
                console.log("index: " + index);
                console.log("array: " + array[index].ID);

                productInputs.forEach(input => {
                    input.value = array[index].product;
                });
                productValue.forEach(value => {
                    value.value = array[index].value;
                });

                selectedEditID = array[index].ID;
                selectedDivID = $(this).parent().index();
                console.log("Selected divID: " + selectedDivID);

                document.querySelectorAll("#data")[1].value = array[index].date;
                if(wrapperEditProduct.className == "wrapper-editProduct"){
                    wrapperAddProduct.classList.remove('active');
                    wrapperReleaseProduct.classList.remove('active');
                    wrapperEditProduct.classList.add('active');
                }
            });

            $(document).on('click', '.btn_delete', function(){
                releaseRemove(parseInt($(this).attr('data-id')));
                $(this).parent().remove();
            });

        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request

    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestions'},
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);
            for(let i in jsonObject){
                sampleSuggestions.push({ID: jsonObject[i].ID, name: jsonObject[i].product, value: jsonObject[i].value, status: jsonObject[i].status});
            }          
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
});

function showAndHide(value){
    if(value === "entrada"){
        document.querySelectorAll("#AutoComplete")[0].style.display = 'none';
        document.querySelectorAll("#entrada")[0].style.display = 'block';
        document.querySelectorAll("#AutoComplete")[1].style.display = 'none';
        document.querySelectorAll("#saida")[0].style.display = 'none';

        document.getElementById("category").style.display = 'none';

        
        Status = "release";
        updateTable();
    }else if(value === "saida"){
        document.querySelectorAll("#AutoComplete")[0].style.display = 'none';
        document.querySelectorAll("#entrada")[0].style.display = 'none';
        document.querySelectorAll("#AutoComplete")[1].style.display = 'none';
        document.querySelectorAll("#saida")[0].style.display = 'block';
        
        document.getElementById("category").style.display = 'none';

        Status = "out";
        updateTable();
    }else if(value === "grafico"){
        document.querySelectorAll("#AutoComplete")[0].style.display = 'none';
        document.querySelectorAll("#entrada")[0].style.display = 'none';
        document.querySelectorAll("#AutoComplete")[1].style.display = 'none';
        document.querySelectorAll("#saida")[0].style.display = 'none';
        Status = "graphic";
        document.getElementById("category").style.display = 'block';

        createGraphic()
    }else if(value === "AutoComplete"){
        document.querySelectorAll("#AutoComplete")[0].style.display = 'block';
        document.querySelectorAll("#entrada")[0].style.display = 'none';
        document.querySelectorAll("#AutoComplete")[1].style.display = 'block';
        document.querySelectorAll("#saida")[0].style.display = 'none';
        Status = "AutoComplete";

        document.getElementById("category").style.display = 'block';
        updateTable();
    }
}
showAndHide("entrada");

function ClosePanel(){
    document.getElementById('float_panel').innerHTML = "";
}

function addProductfunction(productNames, productValuess) {
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestionsAdd', product: productNames, value: productValuess, status: Status},
        datatype: 'json',
        success: function(data){
            const jsonObject = JSON.parse(data);
            
            if(jsonObject.status === "Added"){
                clearInputs();
                sampleSuggestions.push({ID: jsonObject.ID, name: productNames, value: productValuess, status: Status});
            }else{
                //error message here
            }
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
}

function editProductfunction(id, productNames, productValuess) {
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestionsEdit', id: id, product: productNames, value: productValuess},
        datatype: 'json',
        success: function(data){
            const jsonObject = JSON.parse(data);
        
            if(jsonObject.status === "Edited"){
                clearInputs();
                const index = sampleSuggestions.findIndex(suggestion => suggestion.name === productNames);
                if (index !== -1) {
                    // Remove o objeto do array pelo índice encontrado
                    clearInputs();
                    sampleSuggestions[index] = {ID: jsonObject.ID, name: productNames, value: productValuess};

                    console.log(sampleSuggestions[index]);                    
                } else {
                    //error message here
                }
            }          
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
}

function removeProductfunction(id, name) {
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestionsDelete', id: id  },
        datatype: 'json',
        success: function(data){
             const jsonObject = JSON.parse(data);
        
            if(jsonObject.status === "Deleted"){
                const index = sampleSuggestions.findIndex(suggestion => suggestion.name === name);
                if (index !== -1) {
                    // Remove o objeto do array pelo índice encontrado
                    sampleSuggestions.splice(index, 1);
                    clearInputs();
                    console.log(`O nome "${name}" foi encontrado e removido.`);
                    
                } else {
                    console.log(`Nenhum objeto com o nome "${name}" foi encontrado.`);
                }
            }          
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
}

function releaseAdd(productNames, productValuess, dates){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'releaseAdd', product: productNames, value: productValuess, date: dates, status: Status},
        datatype: 'json',
        success: function(data){
            const jsonObject = JSON.parse(data);
            console.log(jsonObject);
            if (jsonObject.status === "Added") {
                array.push({ID: jsonObject.ID, product: productNames, value: productValuess, date: dates, status: Status});

                if(Status == "release"){
                    if(rowsReleaseCount & 1){
                        $('#table').prepend('<div class="rows" data-id='+ jsonObject.ID +'><label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button class="btn_edit" data-id='+ jsonObject.ID +'>edit</button><button class="btn_delete" data-id='+ jsonObject.ID +'>delete</button></div>');
                        /* get the dynamic Div*/
                    }else{
                        $('#table').prepend('<div class="rows pair" data-id='+ jsonObject.ID +'><label>'+ productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button id="btn_edit" class="btn_edit" data-id='+ jsonObject.ID +'>edit</button><button class="btn_delete" data-id='+ jsonObject.ID +'>delete</button></div>');
                    }
                    rowsReleaseCount++;
                }else{
                    if(rowsOutCount & 1){
                        $('#table').prepend('<div class="rows" data-id='+ jsonObject.ID +'><label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button class="btn_edit" data-id='+ jsonObject.ID +'>edit</button><button class="btn_delete" data-id='+ jsonObject.ID +'>delete</button></div>');
                        /* get the dynamic Div*/
                    }else{
                        $('#table').prepend('<div class="rows pair" data-id='+ jsonObject.ID +'><label>'+ productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button id="btn_edit" class="btn_edit" data-id='+ jsonObject.ID +'>edit</button><button class="btn_delete" data-id='+ jsonObject.ID +'>delete</button></div>');
                    }
                    rowsOutCount++;
                }
            }
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
}

function releaseRemove(id){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'releaseDelete', id: id },
        datatype: 'json',
        success: function(data){
            console.log(data);
            const jsonObject = JSON.parse(data);

            if (jsonObject.status === "Deleted") {
                array.splice(array.findIndex(array => array.ID === id), 1);
            }
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
}

function releaseEdit(productNames, productValuess, dates){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'releaseEdit', id: selectedEditID, product: productNames, value: productValuess, date: dates},
        datatype: 'json',
        success: function(data){
            console.log(data);
            const jsonObject = JSON.parse(data);

            if (jsonObject.status === "Edited") {
                array[selectedEditID] = {ID: selectedEditID, product: productNames, value: parseFloat(productValuess), date: dates};
                console.log(array[selectedEditID]);
                let newContent;
                let table = $('#table');
                let specificItem;

                if(selectedEditID & 1){
                    newContent = '<div class="rows" data-id='+ selectedEditID +'><label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button class="btn_edit" data-id='+ selectedEditID + '>edit</button><button class="btn_delete" data-id='+ selectedEditID +'>delete</button></div>';
                    specificItem = table.find('.rows[data-id="' + selectedEditID + '"]');
                }else{
                    newContent = '<div class="rows pair" data-id='+ selectedEditID +'><label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button class="btn_edit" data-id='+ selectedEditID + '>edit</button><button class="btn_delete" data-id='+ selectedEditID +'>delete</button></div>';
                    specificItem = table.find('.rows.pair[data-id="' + selectedEditID + '"]');
                }    
            
                specificItem.replaceWith(newContent);
            }
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
}

function createPanel(value){
    //document.getElementById('float_panel').innerHTML = "";
    let panel = '<div class="mid-panel">';

    switch (value) {
        case 'criar produto':
            panel += '<h1 class="mid-panel-titulo">Criar Produto</h1>'+ //Name Panel
                    '<input type="button" class="close_btn_form" value="X" onclick="return ClosePanel()">'+
                    '<form id="addProduct" action="/" method="post">'+ //Form Name
                    
                    //start Product input
                    '<div class="input-box">'+
                    '<span class="icon"><ion-icon name="bag-add"></ion-icon></span>'+
                    '<input type="text" id="produto" required>'+
                    '<label>Produto</label>'+
                    '</div>'+
                    //end input

                    //start Product input
                    '<div class="input-box">'+
                    '<span class="icon"><ion-icon name="card"></ion-icon></span>'+
                    '<input type="number" min="0.01" max="100000" step="0.01" id="value" required>'+
                    '<label>Valor</label>'+
                    '</div>'+
                    //end input

                    //div error message
                    '<div #id="error"></div>'+
                    
                    
                    //buttun send create
                    '<input type="submit" class="btn" value="Criar Produto">'+
                    //buttun send edit
                    '<input type="submit" class="btn" value="Editar Produto">'+
                    //buttun send delete
                    '<input type="submit" class="btn" value="Deletar">';
                    console.log(value);
        break;

        case 'adicionar produto':
            panel += '<h1 class="mid-panel-titulo">Adicionar Produto</h1>'+ //Name Panel
            '<input type="button" class="close_btn_form" value="X" onclick="return ClosePanel()">'+
            '<form id="releaseProduct" action="/" method="post">'+ //Form Name
            
            //start Product input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="bag-add"></ion-icon></span>'+
            '<input type="text" id="produto" required>'+
            '<label>Produto</label>'+
            '</div>'+
            //end input

            //start Value input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="card"></ion-icon></span>'+
            '<input type="number" min="0.01" max="100000" step="0.01" id="value" required>'+
            '<label>Valor</label>'+
            '</div>'+
            //end input

            //start descont input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="pricetag"></ion-icon></span>'+
            '<input type="number" min="0.01" max="100000" step="0.01" id="desconto" required>'+
            '<label>Desconto</label>'+
            '</div>'+
            //end input

            //start data input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="pricetag"></ion-icon></span>'+
            '<input type="date" id="theDate" required></input>'+
            '<label>Data</label>'+
            '</div>'+
            //end input

            //div error message
            '<div #id="error"></div>'+

            //buttun send
            '<input type="submit" class="btn" value="Lançar Produto">';

           
            
            console.log(value);
        break;

        case 'criar saida':
            panel += '<h1 class="mid-panel-titulo">Criar Saida</h1>'+ //Name Panel
                    '<input type="button" class="close_btn_form" value="X" onclick="return ClosePanel()">'+
                    '<form id="releaseProduct" action="/" method="post">'+ //Form Name
                    
                    //start Product input
                    '<div class="input-box">'+
                    '<span class="icon"><ion-icon name="bag-add"></ion-icon></span>'+
                    '<input type="text" id="produto" required>'+
                    '<label>Produto</label>'+
                    '</div>'+
                    //end input

                    //start value input
                    '<div class="input-box">'+
                    '<span class="icon"><ion-icon name="card"></ion-icon></span>'+
                    '<input type="number" min="0.01" max="100000" step="0.01" id="value" required>'+
                    '<label>Valor</label>'+
                    '</div>'+
                    //end input

                    //div error message
                    '<div #id="error"></div>'+

                    //buttun send
                    '<input type="submit" class="btn" value="Criar Saida">';
            console.log(value);
        break;

        case 'adicionar saida':
            panel += '<h1 class="mid-panel-titulo">Adicionar Saida</h1>'+ //Name Panel
            '<input type="button" class="close_btn_form" value="X" onclick="return ClosePanel()">'+
            '<form action="/" method="post">'+ //Form Name
            
            //start Product input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="bag-add"></ion-icon></span>'+
            '<input type="text" id="produto" required>'+
            '<label>Produto</label>'+
            '</div>'+
            //end input

            //start Value input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="card"></ion-icon></span>'+
            '<input type="number" min="0.01" max="100000" step="0.01" id="value" required>'+
            '<label>Valor</label>'+
            '</div>'+
            //end input

            //start descont input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="pricetag"></ion-icon></span>'+
            '<input type="number" min="0.01" max="100000" step="0.01" id="desconto" required>'+
            '<label>Desconto</label>'+
            '</div>'+
            //end input

            //start data input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="calendar"></ion-icon></span>'+
            '<input type="date" id="theDate" required></input>'+
            '<label>Data</label>'+
            '</div>'+
            //end input

            //div error message
            '<div #id="error"></div>'+

            //buttun send
            '<input type="submit" class="btn" value="Criar Produto">';
            console.log(value);
        break;

        case 'editar produto':
            panel += '<h1 class="mid-panel-titulo">Editar</h1>'+ //Name Panel
            '<input type="button" class="close_btn_form" value="X" onclick="return ClosePanel()">'+
            '<form id="editProduct" action="/" method="post">'+ //Form Name
            
            //start Product input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="bag-add"></ion-icon></span>'+
            '<input type="text" id="produto" required>'+
            '<label>Produto</label>'+
            '</div>'+
            //end input

            //start Value input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="card"></ion-icon></span>'+
            '<input type="number" min="0.01" max="100000" step="0.01" id="value" required>'+
            '<label>Valor</label>'+
            '</div>'+
            //end input

            //start descont input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="pricetag"></ion-icon></span>'+
            '<input type="number" min="0.01" max="100000" step="0.01" id="desconto" required>'+
            '<label>Desconto</label>'+
            '</div>'+
            //end input

            //start data input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="calendar"></ion-icon></span>'+
            '<input type="date" id="theDate" required></input>'+
            '<label>Data</label>'+
            '</div>'+
            //end input

            //div error message
            '<div #id="error"></div>'+

            //buttun send
            '<input type="submit" class="btn" value="Criar Produto">';
            console.log(value);
        break;
    
        case 'editar autoComplete':
            panel += '<h1 class="mid-panel-titulo">Editar</h1>'+ //Name Panel
            '<input type="button" class="close_btn_form" value="X" onclick="return ClosePanel()">'+
            '<form id="editProduct" action="/" method="post">'+ //Form Name
            
            //start Product input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="bag-add"></ion-icon></span>'+
            '<input type="text" id="produto" required>'+
            '<label>Produto</label>'+
            '</div>'+
            //end input

            //start Value input
            '<div class="input-box">'+
            '<span class="icon"><ion-icon name="card"></ion-icon></span>'+
            '<input type="number" min="0.01" max="100000" step="0.01" id="value" required>'+
            '<label>Valor</label>'+
            '</div>'+
            //end input

            //div error message
            '<div #id="error"></div>'+

            //buttun send
            '<input type="submit" class="btn" value="Criar Produto">';
            console.log(value);
        break;
    }

    panel += '</form>'+
            '</div>';

    document.getElementById('float_panel').innerHTML = panel;

    if(value  == "adicionar produto" || value == "adicionar saida" || value === "editar produto" ) {
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        
        var today = year + "-" + month + "-" + day;       
        document.getElementById("theDate").value = today;

        const releaseProductForm = document.getElementById("releaseProduct");
        if(releaseProductForm !== null) {
            releaseProductForm.addEventListener("submit", function(event) {
                event.preventDefault();
            
                let productNames = document.getElementById('#product').value;
                let productValuess = document.getElementById('#value').value;
                let date = document.querySelector('#data').value;
            
                releaseAdd(productNames, productValuess, date);
            });
        }
        

        const editProductForm = document.getElementById('editProduct');
        if(editProductForm !== null){
            editProductForm.addEventListener("submit", function(event) {
                event.preventDefault();
                let productNames = document.getElementById('#product').value;
                let productValuess = document.getElementById('#value').value;
                let date = document.querySelector('#data').value;
            
                releaseEdit(productNames, productValuess, date);
            });
        }
        
    }else{

        const addProductForm = document.getElementById("addProduct");
        if(addProductForm !== null) {
            addProductForm.addEventListener("submit", function(event) {
                event.preventDefault();
            
                const clickedButtonValue = event.submitter.value;
                let productNames = document.getElementById('#product').value;
                let productValuess = document.getElementById('#value').value;
            
            
                let id = 0;
                if(clickedButtonValue != "sugestionsAdd" ){
                    const suggestion = sampleSuggestions.find(suggestion => suggestion.name === productNames);
                    id = suggestion ? suggestion.ID : null;
                }
            
                switch (clickedButtonValue) {
                    case "sugestionsAdd":
                        addProductfunction(productNames, productValuess);
                    break;
            
                    case "sugestionsEdit":
                        editProductfunction(productNames, productValuess);
                    break;
            
                    case "sugestionsDelete":
                        removeProductfunction(id, productNames);
                    break;
                }
            });
        }
        

    }
}

function updateTable() {
    if($('#table div').length > 0 || $('#table canvas').length > 0) {
        $('#table div').remove();
        $('#table canvas').remove();
    }

    if(Status == "graphic"){

        return;
    }

    if(Status == "release" || Status == "out"){
        let c = 0;
        for(let i in array){
            if(array[i].status == Status){
                if(c & 1){
                    $('#table').prepend('<div class="rows" data-id='+ array[i].ID +'><label>' + array[i].product + '</label><label>R$'+ array[i].value +'</label><label>'+ array[i].date +'</label><button class="btn_content" data-id='+ array[i].ID + '>edit</button><button class="btn_content" data-id='+ array[i].ID +'>delete</button></div>');
                    /* get the dynamic Div*/
                }else{
                    $('#table').prepend('<div class="rows pair" data-id='+ array[i].ID +'><label>'+ array[i].product + '</label><label>R$'+ array[i].value +'</label><label>'+ array[i].date +'</label><button class="btn_content" data-id='+ array[i].ID +' >edit</button><button class="btn_content" data-id='+ array[i].ID +'>delete</button></div>');
                }
                c++;
            }
        }    
    }else if(Status == "AutoComplete"){
        let c = 0;
        for(let i in sampleSuggestions){
            
            console.log("AutoComplete2");
            
            if(c & 1){
                $('#table').prepend('<div class="rows" data-id='+ sampleSuggestions[i].ID +'> <label>'+ sampleSuggestions[i].status +'</label> <label>' + sampleSuggestions[i].product + '</label><label>R$'+ sampleSuggestions[i].value +'</label><button class="btn_content" data-id='+ sampleSuggestions[i].ID + '>edit</button><button class="btn_content" data-id='+ sampleSuggestions[i].ID +'>delete</button></div>');
                /* get the dynamic Div*/
                console.log(c);
            }else{
                $('#table').prepend('<div class="rows pair" data-id='+ sampleSuggestions[i].ID +'> <label>'+ sampleSuggestions[i].status +'</label> <label>'+ sampleSuggestions[i].product + '</label><label>R$'+ sampleSuggestions[i].value +'</label><button class="btn_content" data-id='+ sampleSuggestions[i].ID +' >edit</button><button class="btn_content" data-id='+ sampleSuggestions[i].ID +'>delete</button></div>');
                console.log(c);
            }
            c++;
            
        }    
    }
}

function createGraphic(){
    document.getElementById('float_panel').innerHTML = "";

    console.log("createGraphic");

    updateTable();

    if(array.length === 0 ){
        return;
    }


    let graphicArray = [];

    $('#table').prepend('<canvas id="myChart"></canvas>');

    let maxValue = array[0].value;
    let minDays = document.getElementById("DataComeco").value.split("-");
    let maxDays = document.getElementById("DataTermino").value.split("-");

    graphicArray.push({product: array[0].product, value: parseInt(array[0].value), date: array[0].date, count: 1});
    
    for(let i = 1; i < array.length; i++){
        if(maxValue < array[i].value){
            maxValue = array[i].value;
        }

        let date = array[i].date.split("-");
        if((date[0] >= minDays[0] && date[0] <= maxDays[0]) && (date[1] >= minDays[1] && date[1] <= maxDays[1]) && (date[2] >= minDays[2] && date[2] <= maxDays[2])){
            if(graphicArray.findIndex(graphicsArray => graphicsArray.product == array[i].product) > -1){
                let index = graphicArray.findIndex(graphic => graphic.product == array[i].product);
                graphicArray[index].value = parseInt(graphicArray[index].value) + parseInt(array[i].value);
                graphicArray[index].count++;
            }else{
                graphicArray.push({product: array[i].product, value: array[i].value, date: array[i].date, count: 1});
            }
        }       
    }
    const ctx = document.getElementById('myChart');

    try{
        new Chart(ctx, {
            type: 'bar',
            data: {
              labels: graphicArray.map(graphicArrays => graphicArrays.product),
              datasets: [{
                label: 'R$',
                data: graphicArray.map(graphicArrays => graphicArrays.value),
                borderWidth: 1
              },
              {
                  label: 'Quantidade',
                  data: graphicArray.map(graphicArrays => graphicArrays.count),
                  borderWidth: 1
              }    
                  
              ]
          },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }catch(e) {
        console.log(e.message);
    }
}

function Delete(){
    let btnIndex = parseInt($(this).attr('data-id'));

    releaseRemove(btnIndex);
    $(this).parent().remove();
}

let sampleSuggestions = [];


