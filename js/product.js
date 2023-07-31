const wrapperBtnClose = document.querySelectorAll('.icon-close');
const btnCriarProduto = document.querySelector('#btnCriarProduto');
const btnLancarProduto = document.querySelector('#btnLancarProduto');
const wrapperAddProduct = document.querySelector('.wrapper-addProduct');
const wrapperReleaseProduct = document.querySelector('.wrapper-releaseProduct');

var rowsCount = 0;
let array = [] ;

$('document').ready(function(){
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'login', email: "asdawd@gmail.com" },
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);
            console.log(data);

            for(i in jsonObject){
                array.push({ID: jsonObject[i].ID, product: jsonObject[i].product, value: jsonObject[i].value, date: jsonObject[i].date});
                if(i & 1){
                    $('#table').prepend('<div class="rows"><label>' + jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button class="btn_edit">edit</button><button class="btn_delete">delete</button></div>');
                    /* get the dynamic Div*/
                }else{
                    $('#table').prepend('<div class="rows pair"><label>'+ jsonObject[i].product + '</label><label>R$'+ jsonObject[i].value +'</label><label>'+ jsonObject[i].date +'</label><button id="btn_edit" class="btn_edit">edit</button><button class="btn_delete">delete</button></div>');
                }
                rowsCount++;
            }
    
            $(document).on('click', '.btn_edit', function() {
                var btnIndex = $(this).parent().index();
                
                console.log("btn_edit   ", btnIndex, "id no mysql ", array[btnIndex].ID.toString());
            });
    
            $(document).on('click', '.btn_delete', function(){
                var btnIndex = $(this).parent().index();
                console.log("btn_delete   ", btnIndex);
    
                //array.push({ID: rowsCount+1, product: "sdasd"+1, value: rowsCount+20, date: "10"});
    
                //if(rowsCount & 1){
                //   $('#table').append('<div class="rows"><label>' + array[rowsCount].product + '</label><label>R$'+ array[rowsCount].value +'</label><label>'+ array[rowsCount].date +'</label><button class="btn_edit">edit</button><button class="btn_delete">delete</button></div>');
                //    /* get the dynamic Div*/
                //}else{
                //    $('#table').append('<div class="rows pair"><label>'+ array[rowsCount].product + '</label><label>R$'+ array[rowsCount].value +'</label><label>'+ array[rowsCount].date +'</label><button id="btn_edit" class="btn_edit">edit</button><button class="btn_delete">delete</button></div>');
                //}
                
                $(this).parent().remove();
    
                rowsCount++;
            });
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request

    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestions', email: "asdawd@gmail.com" },
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);
            console.log(data);
            
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

    console.log(sampleSuggestions)
});

btnCriarProduto.addEventListener('click', () => { 
    if(wrapperAddProduct.className == "wrapper-addProduct"){
        if(wrapperReleaseProduct.className == "wrapper-releaseProduct active"){
            wrapperReleaseProduct.classList.remove('active');
        }
        wrapperAddProduct.classList.add('active');
    }else{
        wrapperAddProduct.classList.remove('active');
    }
})

btnLancarProduto.addEventListener('click', () => { 
    if(wrapperReleaseProduct.className == "wrapper-releaseProduct"){
        if(wrapperAddProduct.className == "wrapper-addProduct active"){
            wrapperAddProduct.classList.remove('active');
        }
        wrapperReleaseProduct.classList.add('active');
    }else{
        wrapperReleaseProduct.classList.remove('active');
    }

})

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
    clearInputs();
}

wrapperBtnClose.forEach(btns => btns.addEventListener("click", btnClose));

var sampleSuggestions = [
    // { name: "Apple", value: 5.00 },
    // { name: "Banana", value: 2.50 },
    // { name: "Cherry", value: 7.50 },
    // { name: "Grape", value: 3.20 },
    // { name: "Orange", value: 4.00 },
    // { name: "Pineapple", value: 6.50 },
    // { name: "Strawberry", value: 4.80 },
    // { name: "Watermelon", value: 8.00 },
  ];

  // Get references to the input field and the suggestions container
  const productInputs = document.querySelectorAll(".product");
  const productValue = document.querySelectorAll(".valor");

  productInputs.forEach(inputField => {
    const parentContainer = inputField.parentElement;
    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.classList.add("suggestions");
    
    parentContainer.appendChild(suggestionsContainer);

    inputField.addEventListener("input", function() {
      const inputValue = inputField.value.toLowerCase();
      const filteredSuggestions = sampleSuggestions.filter(suggestion =>
        suggestion.name.toLowerCase().startsWith(inputValue)
      );

      suggestionsContainer.innerHTML = ""; // Clear previous suggestions

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

function addProductfunction(email, productNames, productValuess, date) {
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestionsAdd', email: email, product: productNames, value: productValuess, date: date},
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);
            console.log(data);

            if(jsonObject === "Added"){
                productInputs.value = "";
                productValue.value = "";
                window.location.reload();
            }
            
          
        },
        error: function(error){
            console.log(error);
        }

    });//end ajax request

}

function editProductfunction(email, id, productNames, productValuess) {
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestionsEdit', email: email, id: id, product: productNames, value: productValuess},
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);
            console.log(data);
        
            if(jsonObject === "Edited"){
                window.location.reload();
            }          
        },
        error: function(error){
            console.log(error);
        }
    });//end ajax request
}

function removeProductfunction(email, id, name) {
    $.ajax({
        url: "php/product.php", // Set the server-side script URL here
        type: "POST", // Set the HTTP method here
        data: { function : 'sugestionsDelete', email: email, id: id  },
        datatype: 'json',
        success: function(data){
            const jsonObject = eval(data);
            console.log(data);
        
            if(jsonObject === "Deleted"){
                const index = sampleSuggestions.findIndex(suggestion => suggestion.name === name);
                if (index !== -1) {
                    // Remove o objeto do array pelo índice encontrado
                    sampleSuggestions.splice(index, 1);
                    productInputs.value = "";
                    productValue.value = "";
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
    

   // console.log(id);

    switch (clickedButtonValue) {
        case "sugestionsAdd":
            addProductfunction("asdawd@gmail.com", productNames, productValuess);
        break;

        case "sugestionsEdit":
            editProductfunction("asdawd@gmail.com", productNames, productValuess);
        break;

        case "sugestionsDelete":
            removeProductfunction("asdawd@gmail.com", id, productNames);
        break;
    }
});





