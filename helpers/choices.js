const db = require('../db/connection');

async function getEmployeeChoices () {
    const employees = await db.query(`SELECT * 
    FROM employee;`)
// Returns an Array list of department like objects
    const employeeChoices = employees.map( employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    })
    return employeeChoices
}

async function getDepartmentChoices() {
    const departments = await db.query(`SELECT * 
    FROM department;`)
    // Returns an Array list of department like objects
    const departmentChoices = departments.map( department => {
        return {
            name: department.name,
            value: department.id
        }
    })
    return departmentChoices
}

async function getManagerChoices () {
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
    return managerChoices;
}

async function getRoleChoices () {
    const roles = await db.query(`SELECT * 
    FROM role;`)
    // Returns an Array list of department like objects
    const roleChoices = roles.map( role => {
        return {
            name: role.title,
            value: role.id
        }
    })
    return roleChoices;
}

module.exports = {getRoleChoices, getManagerChoices, getDepartmentChoices, getEmployeeChoices}