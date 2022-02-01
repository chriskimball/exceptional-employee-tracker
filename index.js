// Required modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

// const logo = require('asciiart-logo');
// const config = require('./package.json');
// console.log(logo(config).render());



async function viewAllEmployees() {
    const employees = await db.query(`SELECT * FROM employee`)

    console.table(employees)
}

viewAllEmployees();