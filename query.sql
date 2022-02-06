    SELECT d.name,
    SUM(r.salary) AS total_budget
    FROM employee e
    JOIN role r ON r.id = e.role_id
    JOIN department d ON d.id = r.department_id
    WHERE r.department_id = ?;


SELECT d.name,
        SUM(r.salary) AS total_budget
        FROM department d
        JOIN role r ON r.department_id = d.id
        WHERE r.department_id = ?
        GROUP BY d.name;
    WHERE r.department_id = 1;
SUM(r.salary) AS total_budget

    SELECT d.name,
        SUM(r.salary) AS total_budget
        FROM department d
        JOIN role r ON r.department_id = d.id
        WHERE r.department_id = ?
        GROUP BY d.name;

        (SELECT (e.salary)
    r.salary 
    FROM employee e
    JOIN role r ON r.id = e.role_id
    JOIN department d ON d.id = r.department_id;) as total_service_cost