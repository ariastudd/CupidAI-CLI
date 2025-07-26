#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

program
  .name('cupidai')
  .description('CLI para CupidAI - Herramienta de línea de comandos')
  .version('1.0.0');

program
  .command('init')
  .description('Inicializar un nuevo proyecto CupidAI')
  .action(() => {
    console.log(chalk.green('🏹 Inicializando proyecto CupidAI...'));
    console.log(chalk.blue('Proyecto creado exitosamente!'));
  });

program
  .command('status')
  .description('Mostrar el estado actual del proyecto')
  .action(() => {
    console.log(chalk.yellow('📊 Estado del proyecto CupidAI'));
    console.log(chalk.cyan('Todo funcionando correctamente!'));
  });

program.parse();