const program = require('commander');
const { version } = require('../package.json');
const path = require('path');
const { mapActions, templates } = require('./config');
const chalk = require('chalk');

Object.keys(mapActions).forEach((key) => {
  const action = mapActions[key];
  program
    .command(key)
    .description(action.description)
    .action(() => {
      if (key === 'list') {
        for (const k of Object.keys(templates)) {
          chalk.blue(console.log(`${k}: ${templates[k].description}`));
        }
      } else if (key === 'create') {
        require(path.join(__dirname, key))(...process.argv.slice(3));
      } else if (key === '*') {
        console.log(action.description);
      }
    });
});

program.on('--help', () => {
  console.log('\nExplames:');
  Object.keys(mapActions).forEach((key) => {
    const action = mapActions[key];
    action.examples.forEach((item) => {
      console.log(item);
    });
  });
});

program.version(version).parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
