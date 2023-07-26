
//Load data into table
$(document).ready(function () {
    $('#dataTable').DataTable({
        ajax: 'data/arrays.txt',
    });
});

console.log("TEST");

//Event Handlers
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('logoutButton').addEventListener('click', logout);
})

function logout() {
    fetch('http://localhost:4000/logout', { //CHANGE to http://api:3000/logout later, when proxy is added to avoid cors 
        method: 'POST',
        credentials: 'include', // Include cookies in the cross-origin request?
    })
    .then(response => {
        if (response.ok) { 
            window.location.href = response.url;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

