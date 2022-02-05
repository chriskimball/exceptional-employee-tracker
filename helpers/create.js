const db = require("../db/connection");

async function insertDepartment(name) {
  db.query(
    `INSERT INTO department (name)
        VALUES (?);`,
    name,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

async function insertEmployee(first_name, last_name, role_id, manager_id) {
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);`,
    [first_name, last_name, role_id, manager_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

async function insertRole(title, salary, department_id) {
  db.query(
    `INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);`,
    [title, salary, department_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

module.exports = { insertDepartment, insertEmployee, insertRole };
