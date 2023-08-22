
// Since authentication is not the focus of the project, this is a band-aid solution:
const cookies = document.cookie.split(';');
let authorized = false; 

for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name == 'token') {  // The "token" cookie exists
        $(document).ready(function () {
            $('#dataTable').DataTable({
                ajax: 'data/arrays.txt',
            });
        });
        authorized = true;
        break;
    } 
}

if (authorized){         // The "token" cookie does not exist
    window.location.href = "/table";
}



let msg = document.getElementById("msg");

//Check if user just logged out:
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('logout');
if (myParam == 'true') {
    msg.innerHTML = '<section class="alert alert-success"><p>Logged out successfully</p></section>';
}

//Handles server responses:
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-validation');
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        let error = false;
        fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        })
        .then((response) => {
            if (response.ok) {
                console.log("RESPONSE IS OK");
                error = false;
            } else {
                console.log("RESPONSE IS ERR");
                error = true;
            }
            return response.json();
        })
        .then((responseJSON) => {
            if (error) {
                console.log("RESPONSE IS ERR 2");
                msg.innerHTML = `<div class="alert alert-danger"><p> ${responseJSON.error} </p></div>`;
            } else {
                console.log("RESPONSE IS OK 2");
                document.cookie = `token=${responseJSON.token}`;
                window.location.href = "/table"
            }
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    });
});

