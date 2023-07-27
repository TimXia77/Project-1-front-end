
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

if (!(authorized)){         // The "token" cookie does not exist
    window.location.href = "http://localhost/login-en.html";
}


