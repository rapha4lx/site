const wrapperBtnClose = document.querySelector('.icon-close');
const btnCriarProduto = document.querySelector('#btnCriarProduto');
const btnLancarProduto = document.querySelector('.btnLancarProduto');
const wrapper = document.querySelector('.wrapper');
var btn_edit = document.querySelector('.btn_edit');


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
    });

});

// $('#button').on('click', function() {
//     console.log("btn_edit");
// });

btnCriarProduto.addEventListener('click', () => { 
    wrapper.classList.add('active');
})

wrapperBtnClose.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// $('#valor').on('input', function() {
//     this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
//     console.log("sdds1111");
// });

// $('.btn_delete').on('click', function() {
//     console.log("btn_desadawlete");
// });

// $('#button').on('click', function() {
//     console.log("btn_edit");
// });

// btn_edit.addEventListener('click', () => {
//     console.log("btn_edit2");
// });