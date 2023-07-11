
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('error');
let errorText = document.getElementById("msg");

switch (myParam) {
    case "taken-user-email":
        errorText.innerHTML = '<div class="alert alert-danger"><p>Username and email taken by another user</p></div>';
        break;
    case "taken-email":
        errorText.innerHTML = '<div class="alert alert-danger"><p>Email is already taken by another user</p></div>';
        break;
    case "taken-user":
        errorText.innerHTML = '<div class="alert alert-danger"><p>Username is already taken by another user</p></div>';
        break;
    case "username":
        errorText.innerHTML = '<div class="alert alert-danger"><p>Invalid format for username</p></div>';
        break;
    case "email":
        errorText.innerHTML = '<div class="alert alert-danger"><p>Invalid format for email</p></div>';
        break;
    case "password":
        errorText.innerHTML = '<div class="alert alert-danger"><p>Invalid format for password</p></div>';
        break;
}