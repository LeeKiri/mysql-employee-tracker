DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(1, 'Suzie', 'McDonald', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2, 'Bob', 'Mackie', 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3, 'Grace', 'Jones', 1, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(4, 'Nathan', 'Green', 4, 2);

INSERT INTO department (name)
VALUES('Sales');
INSERT INTO department (name)
VALUES('Engineering');
INSERT INTO department (name)
VALUES('Finance');
INSERT INTO department (name)
VALUES('Legal');
INSERT INTO department (name)
VALUES('Human Resources');

INSERT INTO roles (id, title, salary, department_id)
VALUES(1, 'Lawyer', 150000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES(2, 'Legal Team Lead', 110000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES(3, 'Sales Lead', 90000, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES(4, 'Software Engineer', 140000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES(5, 'Accountant', 80000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES(6, 'Talent Aquisition', 90000, 5);