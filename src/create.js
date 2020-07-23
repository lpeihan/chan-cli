const inquirer = require('inquirer');
const download = require('download-git-repo');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const ora = require('ora');
const handlebars = require('handlebars');
const fs = require('fs');
const { templates } = require('./config.js');

const spinner = ora('download template...');

module.exports = (name) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'which template does your project use?',
      choices: [
        'mobile',
        'pc'
      ]
    },
    {
      type: 'input',
      name: 'projectName',
      message: `project name: (${name})`
    },
    {
      type: 'input',
      name: 'description',
      message: 'description:'
    },
    {
      type: 'input',
      name: 'author',
      message: 'author:'
    }
  ]).then(res => {
    const projectName = res.projectName || name;
    spinner.start();
    download(templates[res.type].url, projectName, { clone: true }, err => {
      if (err) {
        spinner.fail();
        console.log(logSymbols.error, chalk.red('download fail'));
        return;
      }

      spinner.succeed();

      const pkgPath = `${projectName}/package.json`;
      const pkgContent = fs.readFileSync(pkgPath, 'utf8');
      const pkgResult = handlebars.compile(pkgContent)({
        name,
        author: res.author,
        description: res.description
      });
      fs.writeFileSync(pkgPath, pkgResult);
      console.log(logSymbols.success, chalk.green('download successfully'));
    });
  });
};
