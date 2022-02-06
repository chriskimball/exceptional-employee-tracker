const db = require("../db/connection");

// SQL query to insert new department record in department table.
async function insertDepartment(name) {
  return db.query(`INSERT INTO department (name)
        VALUES (?);`,
    name,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Added", name, "to the database.");
    }
  );
};

// SQL query to insert new employee record in employee table.
async function insertEmployee(first_name, last_name, role_id, manager_id) {
  return db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?);`,
    [first_name, last_name, role_id, manager_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${first_name} ${last_name} to the database.`);
    }
  );
};

// SQL query to insert new role record in role table.
async function insertRole(title, salary, department_id) {
  return db.query(`INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?);`,
    [title, salary, department_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${title} to the database.`);
    }
  );
};

module.exports = {
  insertDepartment,
  insertEmployee,
  insertRole,
};
