DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department 
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    varchar(30) UNIQUE NOT NULL
);

CREATE TABLE role
(
    id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title               varchar(30) UNIQUE NOT NULL,
    salary              DECIMAL(10, 2) UNSIGNED NOT NULL,
    department_id       INT UNSIGNED NOT NULL,

    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    first_name      varchar(30) NOT NULL,
    last_name       varchar(30) NOT NULL,
    role_id         INT NOT NULL,

    INDEX role_ind(role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,

     manager_id      INT UNSIGNED,
     INDEX man_ind (manager_id),
     CONSTRAINT fk_manager FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);


