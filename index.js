const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const query = require("./queries/sql-queries");
const chalk = require("chalk");
const figlet = require("figlet");

//sets up the local host connection to mySQL database
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
// connecting
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
// Sets up the flow for the Inquirer loop of questions
const promptQuestions = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View employees by role",
        "View employees by department",
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
        case "View employees by role":
          viewEmployeesByRole();
          break;
        case "View employees by department":
          viewEmployeesByDepartment();
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
// function to view all Employees
const viewEmployees = () => {
  console.log("Selecting all employees");
  connection.query(query.viewEmployees, (err, res) => {
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
  });
};
// funtion to view employees bu role
const viewEmployeesByRole = () => {
  connection.query(query.getRoles, (err, res) => {
    if (err) throw err;
    const roles = res.map(({ id, title }) => ({
      value: id,
      name: title,
    }));
    inquirer
      .prompt([
        {
          name: "role",
          type: "rawlist",
          message: "What role would you like to view?",
          choices: roles,
        },
      ])
      .then((answer) => {
        console.log(`Getting employees by role ${answer.role}`);
        connection.query(
          query.selectEmployeesByRole,
          answer.role,
          (err, res) => {
            if (err) throw err;
            console.log(
              chalk.yellow.bold(
                `====================================================================================`
              )
            );
            console.log(
              `                              ` +
                chalk.green.bold(`Employees by Role`)
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
      });
  });
};
//funcion to view employees by department
const viewEmployeesByDepartment = () => {
  connection.query(query.getDepartments, (err, res) => {
    if (err) throw err;
    const departments = res.map(({ id, name }) => ({
      value: id,
      name: name,
    }));
    inquirer
      .prompt([
        {
          name: "dep",
          type: "rawlist",
          message: "What department would you like to view?",
          choices: departments,
        },
      ])
      .then((answer) => {
        console.log(`Getting employees by department ${answer.dep}`);
        connection.query(
          query.selectEmployeesByDepartment,
          answer.dep,
          (err, res) => {
            if (err) throw err;
            console.log(
              chalk.yellow.bold(
                `====================================================================================`
              )
            );
            console.log(
              `                              ` +
                chalk.green.bold(`Employees by Department`)
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
      });
  });
};
// function to view all departments
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
//function to view all roles
const viewRoles = () => {
  console.log(`Selecting all roles`);
  connection.query(query.viewRoles, (err, res) => {
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
//funtion to add an employee
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
      connection.query(query.selectRole, (error, data) => {
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
              query.insertEmployee,
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
      });
    });
};
//function to add a role
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
      connection.query(query.getDepartment, (error, data) => {
        if (error) throw error;
        const departmentId = data.map(({ id, name }) => ({
          value: id,
          name: name,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "id",
              message: "What department is this role in?",
              choices: departmentId,
            },
          ])
          .then((addDepartment) => {
            const dep = addDepartment.id;
            console.log(`Adding new role`);
            connection.query(
              query.insertRole,
              {
                title: answer.title,
                department_id: dep,
                salary: answer.salary,
              },
              (err, res) => {
                if (err) throw err;
                console.log(`${answer.title} has been added`);
                promptQuestions();
              }
            );
          });
      });
    });
};
//funtion to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of the new Department",
      },
    ])
    .then((answer) => {
      console.log(`Adding new department`);
      connection.query(
        query.insertDepartment,
        { name: answer.title },
        (err, res) => {
          if (err) throw err;
          console.log(`${answer.title} has been added`);
          promptQuestions();
        }
      );
    });
};
//function to remove an employee
const removeEmployee = () => {
  connection.query(query.getEmployees, (err, res) => {
    if (err) throw err;
    const employees = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: first_name + " " + last_name,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "id",
          message: "Which employee would you like to delete?",
          choices: employees,
        },
      ])
      .then((answer) => {
        connection.query(query.deleteEmployee, answer.id, (err, res) => {
          if (err) throw err;
          console.log(`Employee has been deleted`);
          promptQuestions();
        });
      });
  });
};
const updateEmployeeRole = () => {
  connection.query(query.getEmployees, (err, res) => {
    if (err) throw err;
    const employees = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: first_name + " " + last_name,
    }));
    connection.query(query.getRoles, (err, res) => {
      if (err) throw err;
      const roles = res.map(({ id, title }) => ({
        value: id,
        name: title,
      }));
      inquirer
        .prompt([
          {
            type: "rawlist",
            name: "emp",
            message: "Which employee would you like to change?",
            choices: employees,
          },
          {
            type: "rawlist",
            name: "rol",
            message: "What role would you like to assign?",
            choices: roles,
          },
        ])
        .then((answer) => {
          connection.query(
            query.updateEmployee,
            answer.rol,
            answer.emp,
            (err, res) => {
              if (err) throw err;
              console.log(`Employee role has been updated`);
              promptQuestions();
            }
          );
        });
    });
  });
};
// updateEmployeeManager();

// ends the connection when user selects the exit option.
const exit = () => {
  connection.end();
};
