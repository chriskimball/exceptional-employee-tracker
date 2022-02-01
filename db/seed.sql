INSERT INTO department (id, name)
VALUES  (1, "Engineering"),
        (2, "Finance"),
        (3, "Legal"),
        (4, "Sales"),
        (5, "Client Services");
       
INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 100000, 4),
        (2, "Salesperson", 80000, 4),
        (3, "Lead Engineer", 150000, 1),
        (4, "Software Engineer", 120000, 1),
        (5, "Account Manager", 160000, 2),
        (6, "Accountant", 125000, 2),
        (7, "Legal Team Lead", 250000, 3),
        (8, "Lawyer", 190000, 3),
        (9, "Operations Manager", 70000, 5),
        (10, "Support Representative", 55000, 5);
       
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Jimi", "Hendrix", 7, null),
        (2, "Ozzy", "Osbourne", 8, 1),
        (3, "Aretha", "Franklin", 1, null),
        (4, "Keith", "Richards", 2, 3),
        (5, "Tom", "Petty", 5, null),
        (6, "Mick", "Jagger", 6, 5),
        (7, "Janis", "Joplin", 9, null),
        (8, "Jim", "Morrison", 10, 7),
        (9, "Stevie", "Nicks", 3, null),
        (10, "Robert", "Plant", 4, 9);
       