DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department 
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    varchar(30) UNIQUE NOT NULL
);

CREATE TABLE ROLE
(
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    title               varchar(30) UNIQUE NOT NULL,
    salary              DECIMAL NOT NULL,
    department_id       INT NOT NULL,

    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE CASCADE -- ON DELETE SET NULL
);

CREATE TABLE employee
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    first_name      varchar(30),
    last_name       varchar(30),
    role_id         INT,
    FOREIGN KEY (role_id)
    REFERENCES ROLE(id)
   ON DELETE SET NULL,

     manager_id      INT,
     FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);


