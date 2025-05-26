#!/usr/bin/env node
import { Command } from 'commander';
import { createContextFile } from '../lib/create';
import { setupGlobalIgnore } from '../lib/ignore';
import { zipProject } from '../lib/zip';

const program = new Command();

program
  .name('chatpack')
  .description('Pack only what matters. Zip your code context for smarter AI coding.')
  .version('1.0.0');

program
  .command('zip')
  .description('Zip the current project excluding unnecessary files')
  .action(zipProject);

program
  .command('create')
  .description('Create a starter CHATPACK.md file')
  .option('--file <filename>', 'Specify a custom filename', 'CHATPACK.md')
  .option('--only-md', 'Only generate CHATPACK.md')
  .option('--only-ignore', 'Only generate .chatpackignore')
  .action((options) => {
    createContextFile(options.file, {
      onlyMd: options.onlyMd,
      onlyIgnore: options.onlyIgnore,
    });
  });

program
  .command('ignore')
  .description('Add default ignore rules to your global .gitignore')
  .option('--global', 'Apply ignore rules globally')
  .action((options) => {
    if (options.global) {
      setupGlobalIgnore();
    }
  });

program.parse();
