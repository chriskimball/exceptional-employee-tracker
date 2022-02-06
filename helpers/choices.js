const db = require("../db/connection");

// Function to get array list of employees for inquirer prompt.
async function getEmployeeChoices() {
    const employees = await db.query(`SELECT * 
        FROM employee;`);

    const employeeChoices = employees.map((employee) => {
        return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
        };
    });
    return employeeChoices;
};

// Function to get array list of departments for inquirer prompt.
async function getDepartmentChoices() {
    const departments = await db.query(`SELECT * 
        FROM department;`);

    const departmentChoices = departments.map((department) => {
        return {
        name: department.name,
        value: department.id,
        };
    });
    return departmentChoices;
};

// Function to get array list of managers for inquirer prompt.
async function getManagerChoices() {
    const managers = await db.query(`SELECT * 
        FROM employee 
        WHERE manager_id IS NULL;`);

    const managerChoices = managers.map((manager) => {
        return {
        name: manager.first_name + " " + manager.last_name,
        value: manager.id,
        };
    });
    return managerChoices;
};

// Function to get array list of roles for inquirer prompt.
async function getRoleChoices() {
    const roles = await db.query(`SELECT * 
        FROM role;`);

    const roleChoices = roles.map((role) => {
        return {
        name: role.title,
        value: role.id,
        };
    });
    return roleChoices;
};

module.exports = {
    getRoleChoices,
    getManagerChoices,
    getDepartmentChoices,
    getEmployeeChoices,
};