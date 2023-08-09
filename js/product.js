
const wrapperBtnClose = document.querySelectorAll('.icon-close');
const btnCriarProduto = document.querySelector('#btnCriarProduto');
const btnLancarProduto = document.querySelector('#btnLancarProduto');

const wrapperAddProduct = document.querySelector('.wrapper-addProduct');
const wrapperReleaseProduct = document.querySelector('.wrapper-releaseProduct');
const wrapperEditProduct = document.querySelector('.wrapper-editProduct');

const release = document.querySelector('#entrada');
const output = document.querySelector('#saida');
const graphic = document.querySelector('#Graficos');

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
                    $('#table').prepend('<div class="rows" data-id='+ jsonObject[i].ID +'><label>' + jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button class="btn_edit" data-id='+ jsonObject[i].ID + '>edit</button><button class="btn_delete" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                    }else{
                    $('#table').prepend('<div class="rows pair" data-id='+ jsonObject[i].ID +'><label>'+ jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button class="btn_edit" data-id='+ jsonObject[i].ID +' >edit</button><button class="btn_delete" data-id='+ jsonObject[i].ID +'>delete</button></div>');
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
    let now = new Date();
    let month = (now.getMonth() + 1);               
    let day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    let today = now.getFullYear() + '-' + month + '-' + day;
    
    let maxDay = 9999 + '-' + month + '-' + day;
    let minDay = 2000 + '-' + '01' + '-' + '01';

    $('#data').val(today);
    $('#dataFilterIn').val(minDay);
    $('#dataFilterUntil').val(maxDay);
});

btnCriarProduto.addEventListener('click', () => { 
    if(wrapperAddProduct.className == "wrapper-addProduct"){
        if(wrapperReleaseProduct.className == "wrapper-releaseProduct active"){
            wrapperReleaseProduct.classList.remove('active');
            wrapperEditProduct.classList.remove('active');
        }
        wrapperAddProduct.classList.add('active');
    }else{
        wrapperAddProduct.classList.remove('active');
    }
});

btnLancarProduto.addEventListener('click', () => { 
    if(wrapperReleaseProduct.className == "wrapper-releaseProduct"){
        if(wrapperAddProduct.className == "wrapper-addProduct active"){
            wrapperAddProduct.classList.remove('active');
            wrapperEditProduct.classList.remove('active');
        }
        wrapperReleaseProduct.classList.add('active');
    }else{
        wrapperReleaseProduct.classList.remove('active');
    }
});

function clearInputs(){
    productInputs.forEach(productInputs => {
        productInputs.value = '';
    });

    productValue.forEach(productValue => {
        productValue.value = '';
    });
}

function btnClose(event){
    wrapperReleaseProduct.classList.remove('active');
    wrapperAddProduct.classList.remove('active');
    wrapperEditProduct.classList.remove('active');
    clearInputs();
}

wrapperBtnClose.forEach(btns => btns.addEventListener("click", btnClose));

let sampleSuggestions = [];

  // Get references to the input field and the suggestions container
  const productInputs = document.querySelectorAll(".product");
  const productValue = document.querySelectorAll(".valor");

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

const addProductForm = document.getElementById("addProduct");
const releaseProductForm = document.getElementById("releaseProduct");

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

//FORM SUBMIT FORM EVENT ADDPRODUCTSUGGESTIONS
addProductForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const clickedButtonValue = event.submitter.value;
    let productNames = document.querySelector('.product').value;
    let productValuess = document.querySelector('.valor').value;


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

//FORM SUBMIT FORM EVENT ADDPRODUCTRELEASE
releaseProductForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let productNames = document.querySelectorAll('.product')[1].value;
    let productValuess = document.querySelectorAll('.valor')[1].value;
    let date = document.querySelector('#data').value;

    releaseAdd(productNames, productValuess, date);
});

const editProductForm = document.getElementById('editProduct');

editProductForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let productNames = document.querySelectorAll('.product')[2].value;
    let productValuess = document.querySelectorAll('.valor')[2].value;
    let date = document.querySelector('#data').value;

    releaseEdit(productNames, productValuess, date);
});

function updateTable() {
    if($('#table div').length > 0 || $('#table canvas').length > 0) {
        $('#table div').remove();
        $('#table canvas').remove();
    }

    if(Status == "graphic"){

        return;
    }

    let c = 0;
    for(let i in array){
        if(array[i].status == Status){
            if(c & 1){
                $('#table').prepend('<div class="rows" data-id='+ array[i].ID +'><label>' + array[i].product + '</label><label>R$'+ array[i].value +'</label><label>'+ array[i].date +'</label><button class="btn_edit" data-id='+ array[i].ID + '>edit</button><button class="btn_delete" data-id='+ array[i].ID +'>delete</button></div>');
                /* get the dynamic Div*/
            }else{
                $('#table').prepend('<div class="rows pair" data-id='+ array[i].ID +'><label>'+ array[i].product + '</label><label>R$'+ array[i].value +'</label><label>'+ array[i].date +'</label><button class="btn_edit" data-id='+ array[i].ID +' >edit</button><button class="btn_delete" data-id='+ array[i].ID +'>delete</button></div>');
            }
            c++;
        }
    }
}

release.addEventListener('click', function(){
    if(Status === "release"){
        return;
    }
    
    Status = "release";
    updateTable();
});

output.addEventListener('click', function(){
    if(Status === "out"){
        return;
    }
    
    Status = "out";
    updateTable();
});

const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    values: [10, 15, 7, 25, 12],
};

graphic.addEventListener('click', function(){
    if(Status == "graphic"){
        return;
    }

    Status = "graphic";
    
    updateTable();
    let graphicArray = [];
    $('#table').prepend('<canvas id="myChart"></canvas>');

    let maxValue = array[0].value;
    let minDays = document.querySelector("#dataFilterIn").value.split("-");
    let maxDays = document.querySelector("#dataFilterUntil").value.split("-");

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

});

const btnFilter = document.querySelector('#btnFilter');

btnFilter.addEventListener('click',function(){
    Status = "graphic";
    
    updateTable();
    let graphicArray = [];
    $('#table').prepend('<canvas id="myChart"></canvas>');

    let maxValue = array[0].value;
    let minDays = document.querySelector("#dataFilterIn").value.split("-");
    let maxDays = document.querySelector("#dataFilterUntil").value.split("-");

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
});