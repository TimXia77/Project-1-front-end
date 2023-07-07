const express = require("express");
const app = express();

var cookieParser = require("cookie-parser");
const bodyParser = require('body-parser'); //parse body of post req
const PORT = 4000 //allow environment variable to possible set PORT

app.set("view engine", "ejs");

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/views"));
app.use(express.json());


app.get('/api/register', (req, res) => {
    if (req.query.msg) { //If the user just logged out
        res.render('register-en.ejs', { msg: `<section class="alert alert-danger"><p>${req.query.msg}</p></section>` });
    } else {
        res.render('register-en.ejs');
    }
});

app.post('/api/register', (req, res) => {
    let userRequestObj = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    };

    let reload = false;

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRequestObj),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status == 400 || res.status == 409) {
                reload = true;
                return res.json();
            }
        })
        .then((data) => {
            if (reload) {
                res.redirect(`/api/register?msg=${data.error}`);
            } else {
                console.log("data (w/ cookie): " + JSON.stringify(data.cookie)); // Access the cookie value
                res.cookie("token", data.cookie);
                res.redirect("/api/table");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})

//need auth check
app.get('/api/login', (req, res) => {
    // //logged-out -> { msg: '<section class="alert alert-success"><p>Logged out successfully</p></section>' }

    // //any else -> 
    if (req.query.msg) { //If the user just logged out
        if (req.query.msg == 'logged-out'){
            res.render('login-en.ejs', { msg: '<section class="alert alert-success"><p>Logged out successfully</p></section>' });
        } else {
            res.render('login-en.ejs', { msg: `<section class="alert alert-danger"><p>${req.query.msg}</p></section>` });
        }
    } else {
        res.render('login-en.ejs');
    }

});

app.post('/api/login', (req, res) => {

    let userRequestObj = {
        username: req.body.username,
        password: req.body.password
    };

    let reload = false;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRequestObj),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status == 401) {
                reload = true;
                return res.json();
            }
        })
        .then((data) => {
            if (reload) {
                res.redirect(`/api/login?msg=${data.error}`);
            } else {
                res.cookie("token", data.cookie);
                res.redirect("/api/table");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})


app.get('/api/table', (req, res) => {

    const token = req.cookies.token;
    if (!(token)) {
        res.redirect('/api/login');
    }


    let userRequestObj = {
        cookie: token
    };

    fetch('http://localhost:3000/table', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRequestObj),
    })
        .then((res) => {
            console.log("\nstatus: " + res.status);
            return res.json();
            // if (res.ok) {
            //     // Status 200 OK
            // } else {
            //     // Handle non-200 status
            // }
        })
        .then((data) => {
            //write data into views
            console.log('data: ' + data);
            res.render('table-json.ejs', { tableData: JSON.stringify(data) });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

app.post('/api/logout', (req, res) => {
    if (req.cookies.token) {
        res.clearCookie("token");
        res.status(302).redirect("/api/login?msg=logged-out");
    } else {
        res.status(405).send("Invalid JWT");
    }
});

//start server
app.listen(PORT, err => {
    if (err) console.log(err)
    else {
        console.log(`Server listening on port: ${PORT}`)
        console.log(`To Test:`)
        console.log(`http://localhost:${PORT}/api/register`)
        console.log(`http://localhost:${PORT}/api/login`)
    }
})
