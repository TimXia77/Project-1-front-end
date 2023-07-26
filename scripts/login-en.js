// console.log("test 1");

// let userRequestObj = {
//     username: 'TimXia77',
//     password: '1a2b3c4D'
// };

// let reload = false;

// fetch('http://api:3000/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userRequestObj),
// })
//     .then((res) => {
//         console.log("test 2");
//         if (res.ok) {
//             return res.json();
//         } else if (res.status == 400 || res.status == 409) {
//             reload = true;
//             return res.json();
//         }
//     })
//     .then((data) => {
//         if (reload) {
//             res.redirect(`/api/register?msg=${data.error}`);
//         } else {
//             res.cookie("token", data.cookie);
//             res.redirect("/api/table");
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });


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
