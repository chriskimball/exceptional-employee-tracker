// Required modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

// const logo = require('asciiart-logo');
// const config = require('./package.json');
// console.log(logo(config).render());

// Present User with Options
async function inquire () {
    const answers = await inquirer
        .prompt([
            {
                type:"list",
                name:"action",
                message: "What would you like to do?",
                choices:  [
                    { name: "View All Employees", value: viewAllEmployees},
                    { name: "View Employees By Manager", value: viewEmployeesByManager},
                    { name: "View Employees By Department", value: viewEmployeesByDepartment},
                    { name: "Add Employee", value: createEmployee},
                    { name: "Delete Employee", value: deleteEmployee},
                    { name: "Update Employee Role", value: updateEmployeeRole},
                    { name: "Update Employee's Manager", value: updateEmployeeManager},
                    { name: "View All Roles", value: viewAllRoles},
                    { name: "Add Role", value: createRole},
                    { name: "Delete Role", value: deleteRole},
                    { name: "View All Departments", value: viewAllDepartments},
                    { name: "View Department Budget", value: viewDepartmentBudget},
                    { name: "Add Department", value: createDepartment},
                    { name: "Delete Department", value: deleteDepartment},
                    { name: "Quit", value: quit},
                ]

            }
    ])
    .then((answers) => {
        answers.action()
    })
};

// view all departments - READ - `SELECT * FROM [table_name]`
    // May need to JOIN tables to get additional information
async function viewAllDepartments() {
    const departments = await db.query(`SELECT * 
    FROM department 
    ORDER BY name ASC;`)

    console.table(departments)
    inquire()
};


// May need to JOIN tables to get additional information
async function viewAllRoles() {
    const roles = await db.query(`SELECT r.id,
    r.title,
    d.name,
    r.salary
    FROM role r
    JOIN department d ON r.department_id = d.id
    ORDER BY id asc;
    `)

    console.table(roles)
    inquire()
};


// view all Employees - READ - `SELECT * FROM [table_name]`
    // May need to JOIN tables to get additional information
async function viewAllEmployees() {
    const employees = await db.query(`SELECT e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    d.name,
    r.salary, 
    concat(m.first_name,' ', m.last_name) AS manager
    FROM employee e
    JOIN role r ON r.id = e.role_id
    JOIN department d ON d.id = r.department_id
    LEFT JOIN employee m ON m.id = e.manager_id
    ORDER BY id ASC;`)

    console.table(employees)
    inquire()
}

// add a department - CREATE - INSERT INTO [table_name] ("column_names") VALUES ("values")
async function createDepartment() {
    const answers = await inquirer
    .prompt([
        {
            type:"input",
            name:"name",
            message: "What is the name of the department?",
        
        }
    ])
    .then((answers) => {
        
        db.query(`INSERT INTO department (name)
        VALUES (?);`, answers.name, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Added', answers.name, 'to the database.')
            inquire()
            });
    })
};


// add a role - CREATE
async function createRole() {

    // SELECT the existing departments out of the `departments` table
    const departments = await db.query(`SELECT * 
    FROM department;`)
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
            type:"input",
            name:"title",
            message: "What is the name of the role?",
        },
        {
            type:"input",
            name:"salary",
            message: "What is the salary of the role?",
        },
        {
            type:"list",
            name:"department_id",
            message: "Choose a department",
            choices: choices 
        }
    ])
    .then((answers) => {
        const { title, salary, department_id } = answers

        db.query(`INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);`, [title, salary, department_id], (err, result) => {
            if (err) {
                console.log(err);
              }
            console.log(`Added ${title} to the database.'`)
            inquire()
            });
    })
};

// add an employee - CREATE
// add a role - CREATE
async function createEmployee() {

    // SELECT the existing departments out of the `departments` table
    const roles = await db.query(`SELECT * 
    FROM role;`)
    // Returns an Array list of department like objects
    const roleChoices = roles.map( role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    const managers = await db.query(`SELECT * 
    FROM employee 
    WHERE manager_id IS NULL;`)
    // Returns an Array list of department like objects
    const managerChoices = managers.map( manager => {
        return {
            name: manager.first_name + ' ' + manager.last_name,
            value: manager.id
        }
    })
    managerChoices.unshift({name:'None', value: null})

    // .map() the results from `departments` to question data for inquirer
    const answers = await inquirer
        .prompt([
            {
                type:"input",
                name:"first_name",
                message: "What is the employee's first name?",
            },
            {
                type:"input",
                name:"last_name",
                message: "What is the employee's last name?",
            },
            {
                type:"list",
                name:"role_id",
                message: "What is the employee's role?",
                choices: roleChoices 
            },
            {
                type:"list",
                name:"manager_id",
                message: "Who is the employee's manager?",
                choices: managerChoices 
            }
        ])
    .then((answers) => {
        const { first_name, last_name, role_id, manager_id } = answers
        
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);`, [first_name, last_name, role_id, manager_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Added ${first_name} ${last_name} to the database.`)
            inquire()
            });
    });
};


// update an employee
async function updateEmployeeRole() {
    const employees = await db.query(`SELECT * 
    FROM employee;`)
// Returns an Array list of department like objects
    const employeeChoices = employees.map( employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    })

    const roles = await db.query(`SELECT * 
    FROM role;`)
// Returns an Array list of department like objects
    const roleChoices = roles.map( role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    const answers = await inquirer
    .prompt([
        {
            type:"list",
            name:"employee_id",
            message: "Which employee's role would you like to update?",
            choices: employeeChoices 
        },
        {
            type:"list",
            name:"role_id",
            message: "Which role do you want to assign to the selected employee?",
            choices: roleChoices 
        }
    ])
    .then((answers) => {
        const { employee_id, role_id } = answers
        
        db.query(`UPDATE employee 
        SET role_id = ? 
        WHERE id = ?;`, [ role_id, employee_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Updated employee's role.`)
            inquire()
            });
    });

}

// Update employee managers.

async function updateEmployeeManager() {
    const employees = await db.query(`SELECT * 
        FROM employee;`)
    // Returns an Array list of department like objects
    const employeeChoices = employees.map( employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    })

    const managers = await db.query(`SELECT * 
    FROM employee 
    WHERE manager_id IS NULL;`)
    // Returns an Array list of department like objects
    const managerChoices = managers.map( manager => {
        return {
            name: manager.first_name + ' ' + manager.last_name,
            value: manager.id
        }
    })
    managerChoices.unshift({name:'None', value: null})

    const answers = await inquirer
    .prompt([
        {
            type:"list",
            name:"employee_id",
            message: "Which employee's manager would you like to update?",
            choices: employeeChoices 
        },
        {
            type:"list",
            name:"manager_id",
            message: "Which manager do you want to assign to the selected employee?",
            choices: managerChoices 
        }
    ])
    .then((answers) => {
        const { employee_id, manager_id } = answers
        
        db.query(`UPDATE employee 
        SET manager_id = ? 
        WHERE id = ?;`, [ manager_id, employee_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Updated employee's manager.`)
            inquire()
            });
    });

};

// View employees by manager.
async function viewEmployeesByManager() {
    const managers = await db.query(`SELECT * 
    FROM employee 
    WHERE manager_id IS NULL;`)
    // Returns an Array list of department like objects
    const managerChoices = managers.map( manager => {
        return {
            name: manager.first_name + ' ' + manager.last_name,
            value: manager.id
        }
    })

    // .map() the results from `departments` to question data for inquirer
    const answers = await inquirer
    .prompt([
        {
            type:"list",
            name:"manager_id",
            message: "Choose a manager",
            choices: managerChoices 
        }
    ])
    .then((answers) => {
        const { manager_id } = answers

        db.query(`SELECT e.first_name,
        e.last_name,
        r.title,
        r.salary
        FROM employee e
        JOIN role r ON r.id = e.role_id
        WHERE manager_id = ?;`, [manager_id], (err, result) => {
            if (err) {
                console.log(err);
              }
            console.table(result)
            inquire()
            });
    })
    

};

// // View employees by department.
async function viewEmployeesByDepartment() {
    const departments = await db.query(`SELECT * 
    FROM department;`)
    // Returns an Array list of department like objects
    const departmentChoices = departments.map( department => {
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
            choices: departmentChoices 
        }
    ])
    .then((answers) => {
        const { department_id } = answers

        db.query(`SELECT e.first_name,
        e.last_name,
        r.title,
        r.salary
        FROM employee e
        JOIN role r ON r.id = e.role_id
        WHERE department_id = ?;`, [department_id], (err, result) => {
            if (err) {
                console.log(err);
              }
            console.table(result)
            inquire()
            });
    })
};

// // Delete departments, roles, and employees.
async function deleteDepartment() {
    let deleted_department_id
    const departments = await db.query(`SELECT * 
    FROM department;`)
    // Returns an Array list of department like objects
    const departmentChoices = departments.map( department => {
        return {
            name: department.name,
            value: department.id
        }
    })

    const answers = await inquirer
    .prompt([
        {
            type:"list",
            name:"deleted_department_id",
            message: "Which department do you want to delete?",
            choices: departmentChoices 
        }
    ]).then((answers) => {
        deleted_department_id  = answers.deleted_department_id
        const indexOfObject = departmentChoices.findIndex(object => {
            return object.value === deleted_department_id;
        });
          
        if (indexOfObject > -1) departmentChoices.splice(indexOfObject, 1); 
    })
    const newAnswers = await inquirer.prompt([
        {
            type:"list",
            name:"department_id",
            message: "Which deparment should roles in the deleted department be reassigned to?",
            choices: departmentChoices 
    }]).then((newAnswers) => {
        const {department_id} = newAnswers;
        db.query(`UPDATE role 
        SET department_id = ? 
        WHERE department_id = ?;`, [ department_id, deleted_department_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Reassigned roles to their new department.`)
            })
        db.query(`DELETE FROM department
        WHERE id = ?;`, [ deleted_department_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Deleted department.`)
            inquire()
            });
    })
};

async function deleteRole() {
    let deleted_role_id
    const roles = await db.query(`SELECT * 
    FROM role;`)
// Returns an Array list of department like objects
    const roleChoices = roles.map( role => {
        return {
            name: role.title,
            value: role.id
        }
    })

    const answers = await inquirer
    .prompt([
        {
            type:"list",
            name:"deleted_role_id",
            message: "Which role do you want to delete?",
            choices: roleChoices 
        }
    ]).then((answers) => {
        deleted_role_id  = answers.deleted_role_id
        const indexOfObject = roleChoices.findIndex(object => {
            return object.value === deleted_role_id;
        });
          
        if (indexOfObject > -1) roleChoices.splice(indexOfObject, 1); 
    })
    const newAnswers = await inquirer.prompt([
        {
            type:"list",
            name:"role_id",
            message: "Which role should employees with the deleted role be reassigned to?",
            choices: roleChoices 
    }]).then((newAnswers) => {
        const {role_id} = newAnswers;

        db.query(`UPDATE employee 
        SET role_id = ? 
        WHERE role_id = ?;`, [ role_id, deleted_role_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Updated roles.`)
            })
        db.query(`DELETE FROM role
        WHERE id = ?;`, [ deleted_role_id], (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log(`Deleted role.`)
            inquire()
            });
    })
    
    // });
    //  UPDATE employee 
    //  SET role_id = ? 
    //  WHERE role_id = ?;
    //  DELETE FROM role
    //  WHERE id = ?
};

async function deleteEmployee() {
    const employees = await db.query(`SELECT * 
        FROM employee;`)
    // Returns an Array list of department like objects
    const employeeChoices = employees.map( employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });

    // .map() the results from `departments` to question data for inquirer
    const answers = await inquirer
    .prompt([
        {
            type:"list",
            name:"employee_id",
            message: "Which employee do you want to delete",
            choices: employeeChoices 
        }
    ])
    .then((answers) => {
        const { employee_id } = answers

        db.query(`DELETE FROM employee
        WHERE id = ?;`, [employee_id], (err, result) => {
            if (err) {
                console.log(err);
              }
            console.log(`Deleted employee.`)
            inquire()
            });
    })
};

// // View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
async function viewDepartmentBudget() {

    const departments = await db.query(`SELECT * 
    FROM department;`)
    // Returns an Array list of department like objects
    const departmentChoices = departments.map( department => {
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
            choices: departmentChoices 
        }
    ])
    .then((answers) => {
        const { department_id } = answers

        db.query(`SELECT d.name,
        SUM(r.salary) AS total_budget
        FROM department d
        JOIN role r ON r.department_id = d.id
        WHERE r.department_id = ?
        GROUP BY d.name;`, [department_id], (err, result) => {
            if (err) {
                console.log(err);
              }
            console.table(result)
            inquire()
            });
    })
    
};


const quit = () => process.exit(1);

inquire()
