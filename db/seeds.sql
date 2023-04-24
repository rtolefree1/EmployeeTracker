use employeeTracker_db;
INSERT INTO department(name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');


INSERT INTO ROLE(title, salary, department_id)
VALUES ('Sales Lead', 100000.00,1),
       ('Salesperson',  80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer',  120000, 2),
       ('Account Manager', 160000, 3),
       ('Account', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 19000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jon', 'Doe', 1, NULL),
       ('Jane', 'Barker', 1, 1),
       ('Brain', 'Blue', 2, NULL),
       ('Goku', 'Fierce', 2, 3),
       ('Vegeta', 'Armor', 3, NULL),
       ('Piccolo','Green', 3, 5),
       ('Gohan', 'Thgt', 4, Null),
       ('Jane', 'Doe', 4, 7);