
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

if (!(authorized)){         // The "token" cookie does not exist
    window.location.href = "/login-en.html";
}

const logoutButton = document.getElementById("logoutButton");
    
// Add a click event listener to the button
logoutButton.addEventListener("click", function() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/login-en.html"
});


