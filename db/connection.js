const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    // Your mysql username
    user: "root",
    // Your mysql password
    password:"password",
    database: "employees_db"
});

connection.query = util.promisify(connection.query);

connection.connect(function(err) {
    if (err) {
        throw err
    } else {
        console.log('Successfully connected to mysql')
    };
});

module.exports = connection;