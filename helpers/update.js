const db = require("../db/connection");

// Function to re-assign roles from a department that is being deleted.
async function updateRoleDepartment(department_id, deleted_department_id) {
  return db.query(`UPDATE role 
        SET department_id = ? 
        WHERE department_id = ?;`,
    [department_id, deleted_department_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Reassigned roles to their new department.`);
    }
  );
};

// Function to re-assign an employee's role.
async function updateRoleByRoleId(role_id, deleted_role_id) {
  db.query(
    `UPDATE employee 
        SET role_id = ? 
        WHERE role_id = ?;`,
    [role_id, deleted_role_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Updated roles.`);
    }
  );
};

// Function to re-assign an employee's role from a role that is being deleted.
async function updateRoleById(employee_id, role_id) {
  db.query(
    `UPDATE employee 
        SET role_id = ? 
        WHERE id = ?;`,
    [role_id, employee_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Updated employee's role.`);
    }
  );
};

// Function to update an employee's manager.
async function updateManager(employee_id, manager_id) {
  db.query(
    `UPDATE employee 
        SET manager_id = ? 
        WHERE id = ?;`,
    [manager_id, employee_id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(`Updated employee's manager.`);
    }
  );
};

module.exports = {
  updateRoleDepartment,
  updateRoleByRoleId,
  updateRoleById,
  updateManager,
};
