//all database queries
const viewEmployees = 
`SELECT employee.id, employee.first_name, employee.last_name, 
roles.title, roles.salary, department.name AS department,
CONCAT(m_e.first_name, " ", m_e.last_name) AS manager
FROM employee 
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id
LEFT JOIN employee AS m_e ON employee.manager_id = m_e.id
`
const selectRole =
`SELECT roles.id, roles.title FROM roles`

const insertEmployee =
`INSERT INTO employee SET ?`

const viewRoles = 
`SELECT roles.id, roles.title, roles.salary, department.name AS department
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

const getRoles =
`SELECT roles.title, roles.id FROM roles`

const selectEmployeesByRole =
`SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, 
CONCAT(m_e.first_name, " ", m_e.last_name) AS manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN employee AS m_e ON employee.manager_id = m_e.id
WHERE employee.role_id = ?`

const getDepartments = 
`SELECT department.id, department.name FROM department`

const selectEmployeesByDepartment = 
`SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department, CONCAT(m_e.first_name, " ", m_e.last_name) AS manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN department ON roles.department_id = department.id 
LEFT JOIN employee AS m_e ON employee.manager_id = m_e.id
WHERE department.id = ?`

const updateEmployee =
`UPDATE employee SET ? WHERE ?`

const updateManager = 
`UPDATE employee SET ? WHERE ?`

const viewEmployeeManager =
`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role 
FROM employee 
LEFT JOIN roles ON employee.role_id = roles.id 
WHERE employee.id IN 
(SELECT DISTINCT manager_id FROM employee)
ORDER BY(employee.id) ASC;`

const viewManagersTeam =
`SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role,
CONCAT(m_e.first_name, " ", m_e.last_name) AS manager
FROM employee
LEFT JOIN roles ON employee.role_id = roles.id
LEFT JOIN employee AS m_e ON employee.manager_id = m_e.id
WHERE employee.manager_id = ?`

const deleteDepartment =
`DELETE FROM department WHERE id = ?`

const deleteRole =
`DELETE FROM roles WHERE id = ?`

const getSalary =
`SELECT department.name, department_id, SUM(roles.salary) AS total_budget
From roles
LEFT JOIN department ON roles.department_id = department.id
WHERE department.id = ?`

module.exports = {viewEmployees, selectRole, insertEmployee, viewRoles, getDepartment, insertRole, getEmployees, deleteEmployee, insertDepartment, getRoles, selectEmployeesByRole, getDepartments, selectEmployeesByDepartment, updateEmployee, updateManager, viewEmployeeManager, viewManagersTeam, deleteDepartment, deleteRole, getSalary,};
