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

    



});

