const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const sqlQueries = require("./queries/sql-queries");
const chalk = require('chalk');
const figlet = require('figlet');



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
  console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(``);
  console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
  console.log(``);
  console.log(`                                                          ` + chalk.greenBright.bold('Created By: Joseph DeWoody'));
  console.log(``);
  console.log(chalk.yellow.bold(`====================================================================================`));
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
        "View all employees by department",
        "Add an employee",
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
        case "View all employees by department":
          viewEmployeesByDep();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
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
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {

    console.log(
      `ID: ${id} || First Name: ${first_name} || Last Name: ${last_name} || Role-ID: ${role_id} || Manager-ID: ${manager_id}`
    )
      // console.table(
      //   ["id", "first_name", "last_name", "role_id", "manager_id"],
      //   employee
      // );
    });
  });
};

// viewEmployeesByDep();
// addEmployee();
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
