// Required modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

// const logo = require('asciiart-logo');
// const config = require('./package.json');
// console.log(logo(config).render());

// Present User with Options

// view all departments - READ - `SELECT * FROM [table_name]`
    // May need to JOIN tables to get additional information



// view all roles - READ - `SELECT * FROM [table_name]`

    // May need to JOIN tables to get additional information



// view all Employees - READ - `SELECT * FROM [table_name]`

    // May need to JOIN tables to get additional information
async function viewAllEmployees() {
    const employees = await db.query(`SELECT * FROM employee`)

    console.table(employees)
}

viewAllEmployees();


// add a department - CREATE - INSERT INTO [table_name] ("column_names") VALUES ("values")



// add a role - CREATE
async function createRole() {

    // SELECT the existing departments out of the `departments` table
        const departments = [
            {
                id: 1,
                name: "Sales"
            },
            {
                id: 2,
                name: "Accounting"
            },
        ]
    // Returns an Array list of department like objects
        const choices = departments.map( department => {
            return {
                name: department.name,
                value: department.id
            }
        })
    // .map() the results from `departments` to question data for inquirer
    const answers = await inquirer
    .prompt([
        {
            type:"list",
            name:"department_id",
            message: "Choose a department",
            choices: choices /*[
                { name: "Sales", value: 1},
                { name: "Accounting", value: 2},
                { name: "Development", value: 3},
            ]*/

        }
    ])
    .then((answers) => {
        console.log(answers);
    })

     // THEN prompt the user for role information (inquirer)

        // THEN take inquirer prompt data and INSERT them into the `role` table
}

// Write out static SQL query, and then swap in the question marks? to build them into our prompts ()

/*
Using Prepared Statements
With MySQL2 you also get the prepared statements. With prepared statements MySQL doesn't have to prepare plan for same query everytime, this results in better performance. If you don't know why they are important, please check these discussions

How prepared statements can protect from SQL Injection attacks
MySQL provides execute helper which will prepare and query the statement. You can also manually prepare / unprepare statement with prepare / unprepare methods.

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

// execute will internally call prepare and query
connection.execute(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Rick C-137', 53],
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available

    // If you execute same statement again, it will be picked from a LRU cache
    // which will save query preparation time and give better performance
  }
); */

   

// add an employee - CREATE



// update an employee
