const db = require("../db/connection");

async function selectAllEmployees() {
  return db.query(`SELECT e.id, 
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
    ORDER BY id ASC;`);
}
async function selectEmployeesByManager(manager_id) {
  return db.query(
    `SELECT e.first_name,
        e.last_name,
        r.title,
        r.salary
        FROM employee e
        JOIN role r ON r.id = e.role_id
        WHERE manager_id = ?;`,
    [manager_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    }
  );
}
async function selectEmployeesByDepartment(department_id) {
  return db.query(
    `SELECT e.first_name,
    e.last_name,
    r.title,
    r.salary
    FROM employee e
    JOIN role r ON r.id = e.role_id
    WHERE department_id = ?;`,
    [department_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    }
  );
}
async function selectAllRoles() {
  return db.query(`SELECT r.id,
    r.title,
    d.name,
    r.salary
    FROM role r
    JOIN department d ON r.department_id = d.id
    ORDER BY id asc;
 `);
}
async function selectAllDepartments() {
  return db.query(`SELECT * 
 FROM department 
 ORDER BY name ASC;`);
}

async function selectDepartmentBudget(department_id) {
  return db.query(
    `SELECT d.name,
        SUM(r.salary) AS total_budget
        FROM department d
        JOIN role r ON r.department_id = d.id
        WHERE r.department_id = ?
        GROUP BY d.name;`,
    [department_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.table(result);
    }
  );
}

module.exports = {
  selectAllEmployees,
  selectEmployeesByManager,
  selectEmployeesByDepartment,
  selectAllRoles,
  selectAllDepartments,
  selectDepartmentBudget,
};
