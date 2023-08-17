const loginForm = document.getElementById('login_form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('email');
    let senha = document.getElementById('password');

    if((email.value === '' || email.value === null) && (senha.value === ''  || senha.value === null)){
        console.log(email.val + " is already" + senha.val);
        return;
    }

    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(email.value)) {
        alert('Please provide a valid email address');
        return;
    }
    
    $.ajax({
        url: "php/login.php", // Set the server-side script URL here
        method: "POST", // Set the HTTP method here
        data: {
            email: email.value,
            pass: senha.value
        },
        datatype: 'json'
    }).done(function(data) {
        // Handle the response from the server if required
        //console.log(data);
        window.location.href = "produto.php";
    });    
});

