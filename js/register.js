const loginForm = document.getElementById('register_form');

loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    let email = document.querySelector('#email');
    let senha = document.querySelector('#password');

    if((email.value === '' || email.value === null) && (senha.value === ''  || senha.value === null)){
        console.log(email.val + " is already" + senha.val);
        return;
    }
    console.log("fail");

    $.ajax({
        url: "php/register.php", // Set the server-side script URL here
        method: "POST", // Set the HTTP method here
        data: {
            email: email.value,
            pass: senha.value
        },
        datatype: 'json'
    }).done(function(data) {
        // Handle the response from the server if required
        window.location.href = "product.php";
    });    



});

