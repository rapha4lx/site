
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

let sampleSuggestions = [];



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
               array.push({ID: jsonObject[i].ID, product: jsonObject[i].product, value: jsonObject[i].value, desconto: jsonObject[i].desconto, date: jsonObject[i].date, status: jsonObject[i].status});
                    if(rowsReleaseCount & 1){
                        // $('#table').prepend('<div class="rows" data-id='+ jsonObject[i].ID +'> <label>Entrada</label> <label>' + jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label>'+ '<label>desconto: %'+ jsonObject[i].desconto+ '</label>' +'<label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject[i].ID + '>edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                        $('#table').prepend('<div class="rows" data-id='+ jsonObject[i].ID +'> <label>'+( array[i].status == 'release' ? "Entrada" : "Saida")+'</label> <label>' + jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject[i].ID + '>edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                    }else{
                        $('#table').prepend('<div class="rows pair" data-id='+ jsonObject[i].ID +'> <label>'+( array[i].status == 'release' ? "Entrada" : "Saida")+'</label> <label>'+ jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label></label>' +'<label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject[i].ID +' >edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                        // $('#table').prepend('<div class="rows pair" data-id='+ jsonObject[i].ID +'> <label>Entrada</label> <label>'+ jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label>'+ '<label>desconto: %'+ jsonObject[i].desconto+ '</label>' +'<label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject[i].ID +' >edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                    }
                    rowsReleaseCount++;
                }else{
                 array.push({ID: jsonObject[i].ID, product: jsonObject[i].product, value: jsonObject[i].value, desconto: jsonObject[i].desconto, date: jsonObject[i].date, status: jsonObject[i].status});
                    rowsOutCount++;
                }
            }

            $(document).on('click', '#btn_edit', function() {
                let btnIndex = parseInt($(this).attr('data-id'));
                let index = array.findIndex(array => array.ID ==  btnIndex);

                console.log("btnIndex: " + btnIndex);
                console.log("index: " + index);
                console.log("array: " + array[index].ID);

                createPanel("editar produto");

                document.getElementById("produto").value = array[index].product;

                document.getElementById("value").value = array[index].value;
                document.getElementById("desconto").value = array[index].desconto;

                selectedEditID = array[index].ID;
                selectedDivID = $(this).parent().index();
                console.log("Selected divID: " + selectedDivID);

                document.getElementById("theDate").value = array[index].date;
            });

            $(document).on('click', '#btn_delete', function(){
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

        updateTable();
        //createGraphic()
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

function releaseAdd(productNames, productValuess,productDescont, dates){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'releaseAdd', product: productNames, value: productValuess, descont: productDescont, date: dates, status: Status},
        datatype: 'json',
        success: function(data){
            const jsonObject = JSON.parse(data);
            console.log(jsonObject);
            if (jsonObject.status === "Added") {
                array.push({ID: jsonObject.ID, product: productNames, value: productValuess, date: dates, status: Status});

                if(Status == "release"){
                    if(rowsReleaseCount & 1){
                        $('#table').prepend('<div class="rows" data-id='+ jsonObject.ID +'> <label>'+ ( Status == 'release' ? "Entrada" : "Saida") +'</label> <label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject.ID + '>edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject.ID +'>delete</button></div>');
                    }else{
                        $('#table').prepend('<div class="rows pair" data-id='+ jsonObject.ID +'> <label>'+ ( Status == 'release' ? "Entrada" : "Saida") +'</label> <label>'+ productNames + '</label><label>R$'+ productValuess +'</label></label>' +'<label>'+ dates +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject.ID +' >edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject.ID +'>delete</button></div>');
                    }
                    rowsReleaseCount++;
                }else{
                    if(rowsOutCount & 1){
                    $('#table').prepend('<div class="rows" data-id='+ jsonObject.ID +'> <label>'+ ( Status == 'release' ? "Entrada" : "Saida") +'</label> <label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject.ID + '>edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject.ID +'>delete</button></div>');
                }else{
                    $('#table').prepend('<div class="rows pair" data-id='+ jsonObject.ID +'> <label>'+ ( Status == 'release' ? "Entrada" : "Saida") +'</label> <label>'+ productNames + '</label><label>R$'+ productValuess +'</label></label>' +'<label>'+ dates +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject.ID +' >edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject.ID +'>delete</button></div>');
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

function releaseEdit(productNames, productValuess, productDescont, dates){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'releaseEdit', id: selectedEditID, product: productNames, value: productValuess,descont: productDescont, date: dates},
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
            '<input type="number" min="0" max="100" step="1" id="desconto">'+
            '<label>Desconto   %</label>'+
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
                    '<form id="addProduct" action="/" method="post">'+ //Form Name
                    
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
            '<input type="number" min="0" max="100" step="1" id="desconto">'+
            '<label>Desconto   %</label>'+
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
            '<input type="number" min="0" max="100" step="1" id="desconto">'+
            '<label>Desconto   %</label>'+
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
    autoCompleteSuggest();

    if(value  == "adicionar produto" || value == "adicionar saida" || value === "editar produto" ) {
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        
        var today = year + "-" + month + "-" + day;       
        document.getElementById("theDate").value = today;
        
        document.getElementById('desconto').value = 0;

        const releaseProductForm = document.getElementById("releaseProduct");
        if(releaseProductForm !== null) {
            releaseProductForm.addEventListener("submit", function(event) {
                event.preventDefault();
            
                let productNames = document.getElementById('produto').value;
                let productValuess = document.getElementById('value').value;
                let productDescont = document.getElementById('desconto').value;
                let date = document.getElementById('theDate').value;
            
                if(productDescont > 0){
                    productValuess = (parseInt(productDescont) / 100) * productValuess;
                }

                console.log(value);
                releaseAdd(productNames, productValuess, productDescont, date);
            });
        }
        
        const editProductForm = document.getElementById('editProduct');
        if(editProductForm !== null){
            editProductForm.addEventListener("submit", function(event) {
                event.preventDefault();
                let productNames = document.getElementById('produto').value;
                let productValuess = document.getElementById('value').value;
                let productDescont = document.getElementById('desconto').value;
                let date = document.getElementById('theDate').value;
                
                if(productDescont > 0){
                    productValuess = (parseInt(productDescont) / 100) * productValuess;
                }

                console.log(value);
                releaseEdit(productNames, productValuess, productDescont, date);
            });
        }
    }else{
        const addProductForm = document.getElementById("addProduct");
        if(addProductForm !== null) {
            addProductForm.addEventListener("submit", function(event) {
                event.preventDefault();
            
                const clickedButtonValue = event.submitter.value;
                let productNames = document.getElementById('produto').value;
                let productValuess = document.getElementById('value').value;
            
            
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

function autoCompleteSuggest(){
    const productInputs = document.querySelectorAll("#produto");
    const productValue = document.querySelectorAll("#value");

    productInputs.forEach(inputField => {
    const parentContainer = inputField.parentElement;
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.classList.add("suggestions");
    suggestionsContainer.style.height = "120px"; // Adjust the height as needed
    suggestionsContainer.style.overflow = "auto";
    suggestionsContainer.style.visibility = "hidden";
    
    parentContainer.appendChild(suggestionsContainer);

    inputField.addEventListener("input", function() {
      const inputValue = inputField.value.toLowerCase();
      const filteredSuggestions = sampleSuggestions.filter(suggestion =>
        suggestion.name.toLowerCase().startsWith(inputValue)
      );

      suggestionsContainer.innerHTML = ""; // Clear previous suggestions

      if (inputField.value.length > 0) {
        suggestionsContainer.style.visibility = "visible";
      }else {
        suggestionsContainer.style.visibility = "hidden";
      }    

      filteredSuggestions.forEach(suggestion => {
        if(suggestion.status == Status){
            const suggestionElement = document.createElement("div");
            suggestionElement.textContent = suggestion.name;
            suggestionElement.classList.add("suggestion");
            suggestionsContainer.appendChild(suggestionElement);

            // Click event handler for each suggestion
            suggestionElement.addEventListener("click", function(event) {
            const clickedSuggestion = event.target.textContent;
            const selectedSuggestion = sampleSuggestions.find(s => s.name === clickedSuggestion);

            inputField.value = selectedSuggestion.name;
            suggestionsContainer.innerHTML = ""; // Clear the suggestions container after selecting a suggestion
    
            // Use the selectedSuggestion.value as needed (here, we log it to the console)
            //console.log("Selected value:", selectedSuggestion.value);

            productValue.forEach(productValue => {
                productValue.value = parseFloat(selectedSuggestion.value);
            });
         });
        }
      });
    });
});
}


function updateTable() {
    if($('#table div').length > 0 || $('#table canvas').length > 0) {
        $('#table div').remove();
        $('#table canvas').remove();
    }

    // if(Status == "graphic"){

    //     return;
    // }

    let minDays = document.getElementById("DataComeco").value.split("-");
    const minDay = new Date(minDays[2],minDays[1],minDays[0]);

    let maxDays = document.getElementById("DataTermino").value.split("-");
    const maxDay = new Date(maxDays[2],maxDays[1],maxDays[0]);

    let category = document.getElementById("category").value;

    if(Status == "release" || Status == "out"){
        let c = 0;
        for(let i in array){
            if(array[i].status == Status){
                if(filtrar(array[i].product)){                     
                    let date = array[i].date.split("-");
                    const dateTime = new Date(date[2],date[1],date[0]);
                    if( (dateTime.getTime() <= minDay.getTime()) && (dateTime.getTime() >= maxDay.getTime())){                        
                        if(c & 1){
                        // $('#table').prepend('<div class="rows" data-id='+ jsonObject[i].ID +'> <label>Entrada</label> <label>' + jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label>'+ '<label>desconto: %'+ jsonObject[i].desconto+ '</label>' +'<label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject[i].ID + '>edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                            $('#table').prepend('<div class="rows" data-id='+ array[i].ID +'> <label>'+( array[i].status == 'release' ? "Entrada" : "Saida") +'</label> <label>' + array[i].product + '</label><label>R$'+ array[i].value +'</label><label>'+ array[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ array[i].ID + '>edit</button><button id="btn_delete" class="btn_content" data-id='+ array[i].ID +'>delete</button></div>');
                        }else{
                            $('#table').prepend('<div class="rows pair" data-id='+ array[i].ID +'> <label>'+( array[i].status == 'release' ? "Entrada" : "Saida")+'</label> <label>'+ array[i].product + '</label><label>R$'+ array[i].value +'</label></label>' +'<label>'+ array[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ array[i].ID +' >edit</button><button id="btn_delete" class="btn_content" data-id='+ array[i].ID +'>delete</button></div>');
                            // $('#table').prepend('<div class="rows pair" data-id='+ jsonObject[i].ID +'> <label>Entrada</label> <label>'+ jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label>'+ '<label>desconto: %'+ jsonObject[i].desconto+ '</label>' +'<label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_content" data-id='+ jsonObject[i].ID +' >edit</button><button id="btn_delete" class="btn_content" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                        }
                            c++;
                    }
                }
            }
        }
    }else if(Status == "AutoComplete"){
        let c = 0;
        for(let i in sampleSuggestions){
            
            if(filtrar(array[i].product) && (category == array[i].status || category == "all" ) ){ 
                if(c & 1){
                    $('#table').prepend('<div class="rows" data-id='+ sampleSuggestions[i].ID +'> <label>'+ sampleSuggestions[i].status +'</label> <label>' + sampleSuggestions[i].name + '</label><label>R$'+ sampleSuggestions[i].value +'</label><button id="btn_edit" class="btn_content" data-id='+ sampleSuggestions[i].ID + '>edit</button><button  id="btn_delete" class="btn_content" data-id='+ sampleSuggestions[i].ID +'>delete</button></div>');
                    /* get the dynamic Div*/
                    console.log(c);
                }else{
                    $('#table').prepend('<div class="rows pair" data-id='+ sampleSuggestions[i].ID +'> <label>'+ sampleSuggestions[i].status +'</label> <label>'+ sampleSuggestions[i].name + '</label><label>R$'+ sampleSuggestions[i].value +'</label><button id="btn_edit" class="btn_content" data-id='+ sampleSuggestions[i].ID +' >edit</button><button id="btn_delete" class="btn_content" data-id='+ sampleSuggestions[i].ID +'>delete</button></div>');
                    console.log(c);
                }  
                c++;
            }
        }    
    }else if(Status == "graphic"){
        createGraphic();
    }
}

function createGraphic(){
    document.getElementById('float_panel').innerHTML = "";

    if(array.length === 0 ){
        return;
    }


    let graphicArray = [];

    let maxValue = array[0].value;
    let minDays = document.getElementById("DataComeco").value.split("-");
    const minDay = new Date(minDays[2],minDays[1],minDays[0]);

    let maxDays = document.getElementById("DataTermino").value.split("-");
    const maxDay = new Date(maxDays[2],maxDays[1],maxDays[0]);

    //graphicArray.push({product: array[0].product, value: parseInt(array[0].value), date: array[0].date, count: 1});
    let category = document.getElementById("category").value;

    for(const element of array){
        if(!filtrar(element.product)){ 
            continue;
        }

        if(!(category == "all" || category == element.status )){
            continue;
        }


        if(maxValue < element.value){
            maxValue = element.value;
        }

        let date = element.date.split("-");
        const dateTime = new Date(date[2],date[1],date[0]);

        if( (dateTime.getTime() <= minDay.getTime()) && (dateTime.getTime() >= maxDay.getTime())){
            if(graphicArray.findIndex(graphicsArray => graphicsArray.product == element.product) > -1){
                let index = graphicArray.findIndex(graphic => graphic.product == element.product);
                graphicArray[index].value = parseFloat(graphicArray[index].value) + parseFloat(element.value);
                graphicArray[index].count++;
            }else{
                graphicArray.push({product: element.product, value: element.value, date: element.date, count: 1});
            }
        }       
        
    }

    
    $('#table').prepend('<div class="myChart"> <canvas class="myChart" id="myChart0"></canvas> </div>');
    $('#table').prepend('<div class="myChart"> <canvas class="myChart" id="myChart1"></canvas> </div>');

    const ctxBar = document.getElementById('myChart0');
    const ctxRound = document.getElementById('myChart1');

    try{
        new Chart(ctxBar, {
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

    try{
        new Chart(ctxRound, {
            type: 'doughnut',
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

function filtrar(product){
    let productfilter = document.getElementById('produtoFilter');

    return (productfilter.value == product || productfilter.value == '' || productfilter.value === null );
}

