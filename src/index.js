#!/usr/bin/env node
'use strict';

const program = require('commander'),
        chalk = require("chalk"),
        pkg = require('./../package.json');

var handler = function(directory, options) {
  console.log(options.envyronment);
  console.log(options.template);
  console.log(options.customProperties);
}

program
  .command('dc-pedidovenda')
  .version('pkg.version')
  .option('-e', '--envyronment <required>', 'O caminho do arquivo de ambiente deve ser informado')
  .option('-t', '--template <required>', 'Um template base deve ser informado. Ele deve estar nos padrões de variáveis globais do PostMan e possuir uma propriedade chamada\'ordem_solicitacao\', este qual define o flow das chamadasd dos recursos no Rest. ')
  .option('-c', '--customProperties [optional]', 'Pode-se passar ao programa uma relação de N parâmetros seguindo o padrão \'chave=valor\' (respeite o \'=\' como separador) para serem substituídos como variáveis globais pelo newman. Qualquer dúvida, busque pela documentação do DC-PEDIDOVENDA')
  .action(handler);

program.parse(process.argv);

if( program.args.length === 0) program.help();
