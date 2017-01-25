#!/usr/bin/env node
'use strict';
var winston = require('winston');
var program = require('commander');
var pkg = require('./../package.json');
var chalk = require('chalk');

var workingDirectory = __dirname;
var globalValues = [];
program
  .version(pkg.version);

program
  .command('globals [globals...]', 'Global parameters should be \'=\' separated like \'key=value\'')
  .action(function (globals) {
    globalValues = globals;
  });

program
  .option('-e, --envyronment <path>', 'Exported Envyronment path exported by postman. It\'s relative to working-directory path')
  .option('-t, --template <path>', 'Template path to be filled with global values input. It\'s relative to working-directory path')
  .option('-w, --working-directory <path>', 'Working directory to find template and envyronment. \'__dirname\' is used as default.')
  .option('-v, --verbose', 'Verbose this execution stream')
  .parse(process.argv);

if(program.verbose) {
  winston.level = 'verbose';
  winston.log('verbose', chalk.green('Verbose is enabled! Have a good time trying to find a unusual behavior.'));
}

if(program.workingDirectory) workingDirectory = program.workingDirectory;

winston.log('verbose', chalk.yellow('Using ' + workingDirectory + ' as working-directory'));

if(program.envyronment) winston.log('verbose', chalk.yellow('Envyronment\'s full path is ' + workingDirectory + program.envyronment));
if(program.template) winston.log('verbose', chalk.yellow('Template\'s full path is ' + workingDirectory + program.template));

if(!program.envyronment || !program.template) {
  winston.log('error', 'Cannot procces without an envyronment and template. See references under repository ' + pkg.repository.url);
  program.help();
  process.exit(1);
}
