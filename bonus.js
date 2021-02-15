const query = require("./queries/sql-queries");
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");
const chalk = require("chalk");



  module.exports = {viewDepBudget};