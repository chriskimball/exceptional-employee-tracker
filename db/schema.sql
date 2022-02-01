DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- SELECT e.id, 
-- e.first_name, 
-- e.last_name, 
-- r.title, 
-- d.name,
-- r.salary, 
-- concat(m.first_name,' ', m.last_name) AS manager
-- FROM employee e
-- JOIN role r ON r.id = e.role_id
-- JOIN department d ON d.id = r.department_id
-- LEFT JOIN employee m ON m.id = e.manager_id
-- ORDER BY id ASC;



-- SELECT * FROM [course_names] (left table)

-- JOIN department ON course_names.department = department.id
