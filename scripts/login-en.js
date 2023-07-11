
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('error');
let errorText = document.getElementById("msg");

if (myParam == 'internal'){

    errorText.innerHTML = '<div class="alert alert-danger"><p>Internal error occured</p></div>';
} else if (myParam == 'login') {

    errorText.innerHTML = '<div class="alert alert-danger"><p>Invalid username or password</p></div>';
} else {
    const myParam = urlParams.get('logout');

    if (myParam == 'true'){
        errorText.innerHTML = '<section class="alert alert-success"><p>Logged out successfully</p></section>';
    }
}
