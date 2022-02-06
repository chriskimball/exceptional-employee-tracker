// Required modules
const inquirer = require("inquirer");

const { 
    insertDepartment, 
    insertEmployee, 
    insertRole 
} = require("./helpers/create");

const { 
    selectAllEmployees, 
    selectEmployeesByManager, 
    selectEmployeesByDepartment, 
    selectAllRoles, 
    selectAllDepartments, 
    selectDepartmentBudget 
} = require("./helpers/read");

const {
    updateRoleDepartment,
    updateRoleByRoleId,
    updateRoleById,
    updateManager,
} = require("./helpers/update");

const {
    deleteDepartmentQuery,
    deleteEmployeeQuery,
    deleteRoleQuery,
} = require("./helpers/delete");

const {
    getRoleChoices,
    getManagerChoices,
    getDepartmentChoices,
    getEmployeeChoices,
} = require("./helpers/choices");

const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

// Present User with Options
async function inquire() {
    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
            { name: "View All Employees", value: viewAllEmployees },
            { name: "View Employees By Manager", value: viewEmployeesByManager },
            { name: "View Employees By Department", value: viewEmployeesByDepartment },
            { name: "Add Employee", value: createEmployee },
            { name: "Delete Employee", value: deleteEmployee },
            { name: "Update Employee Role", value: updateEmployeeRole },
            { name: "Update Employee's Manager", value: updateEmployeeManager },
            { name: "View All Roles", value: viewAllRoles },
            { name: "Add Role", value: createRole },
            { name: "Delete Role", value: deleteRole },
            { name: "View All Departments", value: viewAllDepartments },
            { name: "View Department Budget", value: viewDepartmentBudget },
            { name: "Add Department", value: createDepartment },
            { name: "Delete Department", value: deleteDepartment },
            { name: "Quit", value: quit },
            ],
        },
        ])
        .then((answers) => {
        answers.action();
        });
};

// Function to view all departments, returns table of all departments in department table.
async function viewAllDepartments() {
    const departments = await selectAllDepartments();

    console.table(departments);
    setTimeout(() => {inquire();}, 100);
};

// Function to view all roles, returns table of all roles in role table.
async function viewAllRoles() {
    const roles = await selectAllRoles();

    console.table(roles);
    setTimeout(() => {inquire();}, 100);
};

// Function to view all employees, returns table of all employees in employee table.
async function viewAllEmployees() {
    const employees = await selectAllEmployees();

    console.table(employees);
    setTimeout(() => {inquire()}, 100);
};

// Function to view all employees by their manager, returns table of all employees for the selected manager.
async function viewEmployeesByManager() {
    const managerChoices = await getManagerChoices();
  
    const answers = await inquirer
        .prompt([
        {
          type: "list",
          name: "manager_id",
          message: "Choose a manager",
          choices: managerChoices,
        },
        ])
        .then((answers) => {
            const { manager_id } = answers;
            selectEmployeesByManager(manager_id);
    
            setTimeout(() => {inquire();}, 100);
        });
};
  
 // Function to view all employees by their department, returns table of all employees for the selected department.
async function viewEmployeesByDepartment() {
    const departmentChoices = await getDepartmentChoices();

    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "department_id",
            message: "Choose a department",
            choices: departmentChoices,
        },
        ])
        .then((answers) => {
        const { department_id } = answers;
        selectEmployeesByDepartment(department_id);

        setTimeout(() => {inquire();}, 100);
        });
};

// Function to view total utilized budget of a department, returns the combined salaries of all employees in the selected department.
async function viewDepartmentBudget() {
    const departmentChoices = await getDepartmentChoices();
  
    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "department_id",
            message: "Choose a department",
            choices: departmentChoices,
        },
        ])
        .then((answers) => {
            const { department_id } = answers;
            selectDepartmentBudget(department_id);
    
            setTimeout(() => {inquire();}, 100);
        });
};
  
 // Function to create a new department, inserts new department data into department table.
 async function createDepartment() {
    const answers = await inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the department?",
        },
        ])
        .then((answers) => {
        const { name } = answers;
        insertDepartment(name);

        setTimeout(() => {inquire();}, 100);
        });
};

 // Function to create a new role, inserts new role data into role table.
 async function createRole() {
    const departmentChoices = await getDepartmentChoices();

    const answers = await inquirer
        .prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "list",
            name: "department_id",
            message: "Choose a department",
            choices: departmentChoices,
        },
        ])
        .then((answers) => {
        const { title, salary, department_id } = answers;
        insertRole(title, salary, department_id);

        setTimeout(() => {inquire();}, 100);
        });
};

 // Function to create a new employee, inserts new employee data into employee table.
async function createEmployee() {
    const roleChoices = await getRoleChoices();
    const managerChoices = await getManagerChoices();

    // Adds a `null` value option to manager choices array, in the event that the employee we are adding is a manager.
    managerChoices.unshift({ name: "None", value: null });

    const answers = await inquirer
        .prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoices,
        },
        {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: managerChoices,
        },
        ])
        .then((answers) => {
        const { first_name, last_name, role_id, manager_id } = answers;
        insertEmployee(first_name, last_name, role_id, manager_id);

        setTimeout(() => {inquire();}, 100);
        });
};

 // Function to update an employee's role, updates the employee's role in the employee table.
 async function updateEmployeeRole() {
    const employeeChoices = await getEmployeeChoices();
    const roleChoices = await getRoleChoices();

    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Which employee's role would you like to update?",
            choices: employeeChoices,
        },
        {
            type: "list",
            name: "role_id",
            message: "Which role do you want to assign to the selected employee?",
            choices: roleChoices,
        },
        ])
        .then((answers) => {
        const { employee_id, role_id } = answers;
        updateRoleById(employee_id, role_id);

        setTimeout(() => {inquire();}, 100);
        });
};

 // Function to update an employee's manager, updates the employee's role in the employee table.
async function updateEmployeeManager() {
    const employeeChoices = await getEmployeeChoices();
    const managerChoices = await getManagerChoices();

    // Adds a `null` value option to manager choices array, in the event that the employee we are updating will be a manager.
    managerChoices.unshift({ name: "None", value: null });

    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Which employee's manager would you like to update?",
            choices: employeeChoices,
        },
        {
            type: "list",
            name: "manager_id",
            message:
            "Which manager do you want to assign to the selected employee?",
            choices: managerChoices,
        },
        ])
        .then((answers) => {
        const { employee_id, manager_id } = answers;
        updateManager(employee_id, manager_id);

        setTimeout(() => {inquire();}, 100);
        });
};



// Function to delete a department, re-assigns roles in deleted department to a new existing department.
async function deleteDepartment() {
    let deleted_department_id;
    const departmentChoices = await getDepartmentChoices();

    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "deleted_department_id",
            message: "Which department do you want to delete?",
            choices: departmentChoices,
        },
        ])
        .then((answers) => {
        deleted_department_id = answers.deleted_department_id;
        const indexOfObject = departmentChoices.findIndex((object) => {
            return object.value === deleted_department_id;
        });

        if (indexOfObject > -1) departmentChoices.splice(indexOfObject, 1);
        });
    const newAnswers = await inquirer
        .prompt([
        {
            type: "list",
            name: "department_id",
            message: "Which deparment should roles in the deleted department be reassigned to?",
            choices: departmentChoices,
        },
        ])
        .then((newAnswers) => {
        const { department_id } = newAnswers;
        updateRoleDepartment(department_id, deleted_department_id);
        deleteDepartmentQuery(deleted_department_id);

        setTimeout(() => {inquire();}, 100);
        });
};

// Function to delete a role, re-assigns employees with deleted role to a new existing role.
async function deleteRole() {
    let deleted_role_id;
    const roleChoices = await getRoleChoices();

    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "deleted_role_id",
            message: "Which role do you want to delete?",
            choices: roleChoices,
        },
        ])
        .then((answers) => {
        deleted_role_id = answers.deleted_role_id;
        const indexOfObject = roleChoices.findIndex((object) => {
            return object.value === deleted_role_id;
        });

        if (indexOfObject > -1) roleChoices.splice(indexOfObject, 1);
        });
    const newAnswers = await inquirer
        .prompt([
        {
            type: "list",
            name: "role_id",
            message: "Which role should employees with the deleted role be reassigned to?",
            choices: roleChoices,
        },
        ])
        .then((newAnswers) => {
        const { role_id } = newAnswers;
        updateRoleByRoleId(role_id, deleted_role_id);
        deleteRoleQuery(deleted_role_id);

        setTimeout(() => {inquire();}, 100);
        });
};

// Function to delete an employee.
async function deleteEmployee() {
    const employeeChoices = await getEmployeeChoices();

    const answers = await inquirer
        .prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Which employee do you want to delete",
            choices: employeeChoices,
        },
        ])
        .then((answers) => {
        const { employee_id } = answers;
        deleteEmployeeQuery(employee_id);

        setTimeout(() => {inquire();}, 100);
        });
};

const quit = () => process.exit(1);

inquire();
