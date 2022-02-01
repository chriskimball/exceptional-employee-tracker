const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    // Your mysql username
    user: "root",
    // Your mysql password
    password:"password",
    database: "employees"
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;