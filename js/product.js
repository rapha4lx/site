const wrapperBtnClose = document.querySelectorAll('.icon-close');
const btnCriarProduto = document.querySelector('#btnCriarProduto');
const btnLancarProduto = document.querySelector('#btnLancarProduto');

const wrapperAddProduct = document.querySelector('.wrapper-addProduct');
const wrapperReleaseProduct = document.querySelector('.wrapper-releaseProduct');
const wrapperEditProduct = document.querySelector('.wrapper-editProduct');

var rowsCount = 0;
var array = [] ;

var selectedEditID = 0;
var selectedDivID = 0;

$('document').ready(function(){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'login'},
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);
            console.log(data);

            for(i in jsonObject){
                array.push({ID: jsonObject[i].ID, product: jsonObject[i].product, value: jsonObject[i].value, date: jsonObject[i].date});
                if(i & 1){
                    $('#table').prepend('<div class="rows" data-id='+ jsonObject[i].ID +'><label>' + jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button class="btn_edit" data-id='+ jsonObject[i].ID + '>edit</button><button class="btn_delete" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                    /* get the dynamic Div*/
                }else{
                    $('#table').prepend('<div class="rows pair" data-id='+ jsonObject[i].ID +'><label>'+ jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_edit" data-id='+ jsonObject[i].ID +' >edit</button><button class="btn_delete" data-id='+ jsonObject[i].ID +'>delete</button></div>');
                }
                rowsCount++;
            }
            
            $(document).on('click', '.btn_edit', function() {
                var btnIndex = parseInt($(this).attr('data-id'));
                var index = array.findIndex(array => array.ID == btnIndex);

                console.log(btnIndex);
                console.log(index);

                productInputs.forEach(input => {
                    input.value = array[index].product;
                });
                productValue.forEach(value => {
                    value.value = array[index].value;
                });

                selectedEditID = array[index].ID;
                selectedDivID = $(this).parent().index();
                console.log(selectedDivID);

                document.querySelectorAll("#data")[1].value = array[index].date;
                if(wrapperEditProduct.className == "wrapper-editProduct"){
                    wrapperAddProduct.classList.remove('active');
                    wrapperReleaseProduct.classList.remove('active');
                    wrapperEditProduct.classList.add('active');
                }
            });

            $(document).on('click', '.btn_delete', function(){
                var btnIndex = parseInt($(this).attr('data-id'));
                //console.log("btn_delete   ", btnIndex);

                releaseRemove(btnIndex);
                $(this).parent().remove();             
                //rowsCount++;
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
            //console.log(data);
            for(i in jsonObject){
                sampleSuggestions.push({ID: jsonObject[i].ID, name: jsonObject[i].product, value: jsonObject[i].value});
            }          
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
    var now = new Date();
    var month = (now.getMonth() + 1);               
    var day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#data').val(today);
    //console.log(sampleSuggestions)
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

var sampleSuggestions = [];

  // Get references to the input field and the suggestions container
  const productInputs = document.querySelectorAll(".product");
  const productValue = document.querySelectorAll(".valor");

productInputs.forEach(inputField => {
    const parentContainer = inputField.parentElement;
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.classList.add("suggestions");
    suggestionsContainer.style.height = "200px"; // Adjust the height as needed
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
      });
    });
});

const addProductForm = document.getElementById("addProduct");
const releaseProductForm = document.getElementById("releaseProduct");

function addProductfunction(productNames, productValuess) {
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestionsAdd', product: productNames, value: productValuess},
        datatype: 'json',
        success: function(data){
            const jsonObject = JSON.parse(data);
            
            if(jsonObject.status === "Added"){
                clearInputs();
                sampleSuggestions.push({ID: jsonObject.ID, name: productNames, value: productValuess});
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
    var productNames = document.querySelector('.product').value;
    //console.log(productName);

    var productValuess = document.querySelector('.valor').value;
    //console.log(productValues);

    var id = 0;
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
        data: { function : 'releaseAdd', product: productNames, value: productValuess, date: dates},
        datatype: 'json',
        success: function(data){
            // console.log(productNames);
            // console.log(productValuess);
            // console.log(dates);
           // console.log(data);
            const jsonObject = JSON.parse(data);
            console.log(jsonObject);
            if (jsonObject.status === "Added") {
                array.push({ID: jsonObject.ID, product: productNames, value: productValuess, date: dates});
                if(rowsCount & 1){
                    $('#table').prepend('<div class="rows" data-id='+ jsonObject.ID +'><label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button class="btn_edit" data-id='+ jsonObject.ID +'>edit</button><button class="btn_delete" data-id='+ jsonObject.ID +'>delete</button></div>');
                    /* get the dynamic Div*/
                }else{
                    $('#table').prepend('<div class="rows pair" data-id='+ jsonObject.ID +'><label>'+ productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button id="btn_edit" class="btn_edit" data-id='+ jsonObject.ID +'>edit</button><button class="btn_delete" data-id='+ jsonObject.ID +'>delete</button></div>');
                }
                rowsCount++;
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
                var index = array.findIndex(array => array.ID === id);
                array.splice(index, 1);
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
                var index = array.findIndex(array => array.ID == selectedEditID);
                array[index] = {id: selectedEditID, product: productNames, value: productValuess, date: dates};

                console.log(array[index]);
                var newContent;

                if(selectedDivID & 1){
                    newContent = '<div class="rows" data-id='+ selectedEditID +'><label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button class="btn_edit" data-id='+ selectedEditID + '>edit</button><button class="btn_delete" data-id='+ selectedEditID +'>delete</button></div>';
                }else{
                    newContent = '<div class="rows pair" data-id='+ selectedEditID +'><label>' + productNames + '</label><label>R$'+ productValuess +'</label><label>'+ dates +'</label><button class="btn_edit" data-id='+ selectedEditID + '>edit</button><button class="btn_delete" data-id='+ selectedEditID +'>delete</button></div>';
                }
                
                var $table = $('#table');
                var $specificItem = $table.find('.rows[data-id="' + selectedEditID + '"]');


                // Update the specific item's content
                $specificItem.replaceWith(newContent);
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

    var productNames = document.querySelectorAll('.product')[1].value;
    var productValuess = document.querySelector('.valor').value;
    var date = document.querySelector('#data').value;

    releaseAdd(productNames, productValuess, date);
});

const editProductForm = document.getElementById('editProduct');

editProductForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var productNames = document.querySelectorAll('.product')[2].value;
    var productValuess = document.querySelector('.valor').value;
    var date = document.querySelector('#data').value;



    releaseEdit(productNames, productValuess, date);
});


