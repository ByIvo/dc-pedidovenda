#!/usr/bin/env node
'use strict';
var winston = require('winston');
var program = require('commander');
var pkg = require('./../package.json');
var chalk = require('chalk');

var workingDirectory = __dirname;
var collection;
var envyronment;
var template;
var globalValues = [];

program
  .version(pkg.version);

program
  .command('globals [globals...]', 'Global parameters should be \'=\' separated like \'key=value\'')
  .action(function (globals) {
    globalValues = globals;
  });

program
  .option('-v, --verbose', 'Verbose this execution stream')
  .option('-e, --envyronment <path>', 'Exported Envyronment path exported by postman. It\'s relative to working-directory path')
  .option('-t, --template <path>', 'Template path to be filled with global values input. It\'s relative to working-directory path')
  .option('-w, --working-directory <path>', 'Working directory to find template and envyronment. \'__dirname\' is used as default.')
  .option('-c, --collection <path>', 'Postman exported collection to be used as newman\'s input')
  .parse(process.argv);

if(program.verbose) {
  winston.level = 'verbose';
  winston.log('verbose', chalk.green('Verbose is enabled! Have a good time trying to find a unusual behavior.'));
}

if(program.workingDirectory) workingDirectory = program.workingDirectory;

winston.log('verbose', chalk.yellow('Using ' + workingDirectory + ' as working-directory'));

if(program.envyronment) winston.log('verbose', chalk.yellow('Envyronment\'s full path is ' + workingDirectory + program.envyronment));
if(program.template) winston.log('verbose', chalk.yellow('Template\'s full path is ' + workingDirectory + program.template));
if(program.collection) winston.log('verbose', chalk.yellow('Collections\'s path is ' + workingDirectory + program.collection));

if(!program.envyronment || !program.template || !program.collection) {
  winston.log('error', 'Cannot procced without an envyronment, template and collection path. See references under repository ' + pkg.repository.url);
  program.help();
  process.exit(1);
}
