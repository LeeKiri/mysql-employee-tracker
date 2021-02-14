DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INT NULL,
    salary DECIMAL(8,2) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN kEY (role_id) REFERENCES roles(id)
);

INSERT INTO department (name)
VALUES('Sales');
INSERT INTO department (name)
VALUES('Engineering');
INSERT INTO department (name)
VALUES('Finance');
INSERT INTO department (name)
VALUES('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Manager', 120000.00, 1), 
('Legal Manager', 180000.00, 4),
('CFO', 200000, 3),
('Lead Software Engineer', 170000.00, 2);

INSERT INTO roles (title, salary, department_id)
VALUES
('Lawyer', 150000, 4),
('Legal Intern', 50000, 4),
('Legal Secretary', 650000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 110000, 1),
('Sales trainee', 50000, 1),
('Sales administrator', 750000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES
('Senior Software Engineer', 140000, 2),
('Software Architect', 160000, 2),
('Mid Software Engineer', 100000, 2),
('Junior Software Engineer', 80000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES
('Accountant', 80000, 3),
('Book keeper', 60000, 3),
('Financial Analyst', 120000, 3),
('Account Manager', 140000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Suzie', 'McDonald', 1, 3),
('Bob', 'Mackie', 2, 3),
('Grace', 'Jones', 3, 3),
('Nathan', 'Green', 4, 3),
('Martha', 'Stewart', 5, 4),
('Chika', 'Banima', 6, 4),
('Naomi', 'Camble', 7, 4),
('Bobbie', 'Brixton', 8, 1),
('Sarah', 'Mccouls', 9, 1),
('Claire', 'Binto', 10, 1),
('Simon', 'Clary', 11, 2),
('Natalie', 'Vegara', 12, 2),
('Pliato', 'Kikanti', 13, 2),
('Niko', 'Harris', 14, 2),
('Erin', 'Smith', 15, 3),
('Sam', 'Dixon', 16, 3),
('Mindy', 'Black', 17, 3),
('Alex', 'Joburg', 18, 3);
