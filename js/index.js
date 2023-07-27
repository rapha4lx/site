const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-Link');
const registerLink = document.querySelector('.register-link');
const btnLoginPopup = document.querySelector('.btnLogin-popup');

const wrapperBtnClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('register');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('register');
});

btnLoginPopup.addEventListener('click', () => {
    if(wrapper.className == "wrapper"){
        wrapper.classList.add('active');
        btnLoginPopup.classList.add('clicked');
    }else{
        wrapper.classList.remove('active');
    }
});

wrapperBtnClose.addEventListener('click', () => {
    wrapper.classList.remove('active');
    btnLoginPopup.classList.remove('clicked');
    wrapper.classList.remove('register');
});

$("#login").submit( function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Perform any additional validation if required

    const email = document.getElementById("login").elements.namedItem("email");
    const pass = document.getElementById("login").elements.namedItem("password");

    if (email.value.trim() === "" || pass.value.trim() === "") {
        alert("Please fill in all the fields.");
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
            pass: pass.value
        },
        datatype: 'json'
    }).done(function(data) {
        // Handle the response from the server if required
        console.log(data);
        window.location.href = "http://www.devmedia.com.br/guia/javascript/34372";
    });    
});

$("#register").submit( function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Perform any additional validation if required
    const name = document.getElementById("register").elements.namedItem("username");
    const email = document.getElementById("register").elements.namedItem("email");
    const pass = document.getElementById("register").elements.namedItem("password");

    if (email.value.trim() === "" || pass.value.trim() === "" || name.value.trim() === "") {
        alert("Please fill in all the fields.");
        return;
    } 
    
    $.ajax({
        url: "php/register.php", // Set the server-side script URL here
        method: "POST", // Set the HTTP method here
        data: {
            name: name.value,
            email: email.value,
            pass: pass.value
        },
        datatype: 'json'
    }).done(function(data) {
        // Handle the response from the server if required
        console.log(data);
    });    
});


