const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'loginsystem',
    port: 3308
});
connection.connect();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// login api,   Please pass username and password to login user
app.post('/login', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
                response.status(200).send(`Login Successfully`);
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// please pass username , email and password for signup
app.post('/signup', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	let email = request.body.email;
	if (username && password && email) {
        var sql = "INSERT INTO accounts (username, password,email) VALUES ?";
        var values = [
            [username,password,email]
          ];
		connection.query(sql, [values], function(error, results, fields) {
			if (error) throw error;
            response.send('User Signup Successfully!');
			response.end();
		});
	} else {
		response.send('Please enter Username and Email and Password! ');
		response.end();
	}
});


app.listen(4000);

