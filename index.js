const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const sqlQueries = require("./queries/sql-queries");
const chalk = require("chalk");
const figlet = require("figlet");

const connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "easy@111",
  database: "employee_tracker",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(
    chalk.yellow.bold(
      `====================================================================================`
    )
  );
  console.log(``);
  console.log(chalk.greenBright.bold(figlet.textSync("Employee Tracker")));
  console.log(``);
  console.log(
    `                                                          ` +
      chalk.greenBright.bold("Created By: Joseph DeWoody")
  );
  console.log(``);
  console.log(
    chalk.yellow.bold(
      `====================================================================================`
    )
  );
  console.log(`connected as id ${connection.threadId}`);
  promptQuestions();
});

const promptQuestions = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "Add an employee",
        "Add a role",
        "Add a department",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee roles":
          updateEmployeeRole();
          break;
        case "Update employee manager":
          updateEmployeeManager();
          break;
        case "Exit":
          exit();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewEmployees = () => {
  console.log("Selecting all employees");
  connection.query(
    "SELECT * FROM employee ORDER BY employee.id ASC",
    (err, res) => {
      if (err) throw err;
      console.log(
        chalk.yellow.bold(
          `====================================================================================`
        )
      );
      console.log(
        `                              ` + chalk.green.bold(`Current Employees`)
      );
      console.log(
        chalk.yellow.bold(
          `====================================================================================`
        )
      );
      console.table(res);
      console.log(
        chalk.yellow.bold(
          `====================================================================================`
        )
      );
      promptQuestions();
    }
  );
};

const viewDepartments = () => {
  console.log(`Selecting all department`);
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.log(
      chalk.yellow.bold(
        `====================================================================================`
      )
    );
    console.log(
      `                              ` + chalk.green.bold(`Current Departments`)
    );
    console.log(
      chalk.yellow.bold(
        `====================================================================================`
      )
    );
    console.table(res);
    console.log(
      chalk.yellow.bold(
        `====================================================================================`
      )
    );
    promptQuestions();
  });
};
const viewRoles = () => {
  console.log(`Selecting all roles`);
  connection.query(`SELECT * FROM roles`, (err, res) => {
    if (err) throw err;
    console.log(
      chalk.yellow.bold(
        `====================================================================================`
      )
    );
    console.log(
      `                              ` + chalk.green.bold(`Current Roles`)
    );
    console.log(
      chalk.yellow.bold(
        `====================================================================================`
      )
    );
    console.table(res);
    console.log(
      chalk.yellow.bold(
        `====================================================================================`
      )
    );
    promptQuestions();
  });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is their first name?",
      },
      { name: "last_name", type: "input", message: "What is their last name?" },
      {
        name: "manager_id",
        type: "input",
        message: "What is their manager-id?",
      },
      {
        name: "department",
        type: "rawlist",
        message: "Which Deapartment does the employee work in?",
        choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal",
          "Human Resources",
        ],
      },
    ])
    .then((answer) => {
      connection.query(
        `SELECT roles.id, roles.title FROM roles`,
        (error, data) => {
          if (error) throw error;
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roles,
              },
            ])
            .then((addRole) => {
              const role = addRole.role;

              console.log(`Adding new employee`);
              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answer.first_name,
                  last_name: answer.last_name,
                  role_id: role,
                  manager_id: answer.manager_id,
                },
                (err, res) => {
                  if (err) throw err;
                  console.log(
                    `${answer.first_name} ${answer.last_name} has been added`
                  );
                  promptQuestions();
                }
              );
            });
        }
      );
    });
};
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role Title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
    ])
    .then((answer) => {
      connection.query(
        `SELECT department.id, department.name FROM department`,
        (error, data) => {
          if (error) throw error;
          const departmentId = data.map(({ id, name }) => ({
            value: id,
            name: name,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What department is this role in?",
                choices: departmentId,
              },
            ])
            .then((addDepartment) => {
              const dep = addDepartment.id;

              console.log(`Adding new role`);
              connection.query(
                "INSERT INTO roles SET ?",
                {
                  title: answer.title,
                  department_id: dep,
                  salary: answer.salary,
                },
                (err, res) => {
                  if (err) throw err;
                  console.log(
                    `${answer.title} has been added`
                  );
                  promptQuestions();
                }
              );
            });
        }
      );
    });
};

// addDepartment();
// removeEmployee();
// updateEmployeeRole();
// updateEmployeeManager();
// exit();

// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);
