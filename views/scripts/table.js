console.log("HERE");
//Load data into table
$(document).ready(function () {
    $('#dataTable').DataTable({
        ajax: 'data/arrays.txt',
    });
});


//Event Handlers
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logoutButton').addEventListener('click', logout);
})

function logout(){ 
    fetch(`/api/logout`, { 
        method: 'POST',
    })
    .then(response => {
        if (response.ok) { //Logged out successfully 
            window.location.href = response.url;      
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

