const db = require("../db/connection");

// Function to delete department record from department table.
async function deleteDepartmentQuery(deleted_department_id) {
  return db.query(`DELETE FROM department
        WHERE id = ?;`,
    [deleted_department_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Deleted department.`);
    }
  );
};

// Function to delete employee record from employee table.
async function deleteEmployeeQuery(employee_id) {
  return db.query(`DELETE FROM employee
        WHERE id = ?;`,
    [employee_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Deleted employee.`);
    }
  );
};

// Function to delete role record from role table.
async function deleteRoleQuery(deleted_role_id) {
  return db.query(`DELETE FROM role
        WHERE id = ?;`,
    [deleted_role_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Deleted role.`);
    }
  );
};

module.exports = {
  deleteDepartmentQuery,
  deleteEmployeeQuery,
  deleteRoleQuery,
};
