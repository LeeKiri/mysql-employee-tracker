const viewEmployees = 
`SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name, 
CONCAT(manager.first_name, " ", manager.last_name) manager
FROM employee 
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee manager ON manager.id = employee.manager_id`

const selectRole =
`SELECT roles.id, roles.title FROM roles`

const insertEmployee =
`INSERT INTO employee SET ?`

const viewRoles = 
`SELECT roles.id, roles.title, roles.salary, department.name 
FROM roles
LEFT JOIN department ON roles.department_id = department.id`

const getDepartment = 
`SELECT department.id, department.name FROM department`

const insertRole = 
"INSERT INTO roles SET ?"

const getEmployees = 
`SELECT employee.id, employee.first_name, employee.last_name FROM employee`

const deleteEmployee =
`DELETE FROM employee WHERE id = ?`

const insertDepartment =
`INSERT INTO department SET ?`


module.exports = {viewEmployees, selectRole, insertEmployee, viewRoles, getDepartment, insertRole, getEmployees, deleteEmployee, insertDepartment};