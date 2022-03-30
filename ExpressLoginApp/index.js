const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'newuser',
    password : 'test123',
    database : 'LoginCredentials'
});

const app = express();

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/auth', function(request, response){
    let user = request.body.username;
    let pass = request.body.password;
    if (user && pass) {
        connection.query(`SELECT * FROM users WHERE username = ? AND password = ?`, [user, pass], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = user;
                response.redirect('/home');
            } else {
                response.send('Incorrect user or password');
            }
            response.end();
        })
    } else {
        response.send("please enter user and pass");
        response.end();
    }
})

app.get ('/home', function(request, response) {
    if (request.session.loggedin) {
        response.send('Welcome, ' + request.session.username)
    } else {
        response.send('Please log in')
    }
    response.end();
})

app.listen(3005)