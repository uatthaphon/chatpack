import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { defaultIgnoreRules } from './constants';
import { setupGlobalIgnore } from './ignore';

export async function createContextFile(
  filename: string,
  options?: { onlyMd?: boolean; onlyIgnore?: boolean }
) {
  const filePath = path.resolve(process.cwd(), filename);
  const ignorePath = path.resolve(process.cwd(), '.chatpackignore');

  const createMd = !options?.onlyIgnore;
  const createIgnore = !options?.onlyMd;

  if (createMd) {
    if (fs.existsSync(filePath)) {
      console.log(`⚠️  ${filename} already exists.`);
    } else {
      const templatePath = path.resolve(
        new URL('.', import.meta.url).pathname,
        '../templates/CHATPACK.md'
      );
      const template = fs.readFileSync(templatePath, 'utf-8');
      fs.writeFileSync(filePath, template);
      console.log(`✅ Created ${filename}`);
    }
  }

  if (createIgnore) {
    if (fs.existsSync(ignorePath)) {
      console.log('⚠️  .chatpackignore already exists.');
    } else {
      fs.writeFileSync(ignorePath, `${defaultIgnoreRules.join('\n')}\n`);
      console.log('✅ Created .chatpackignore');
    }
  }

  if (createMd && createIgnore) {
    const { addIgnore } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addIgnore',
        message: `Would you like to add CHATPACK.md and zip files to your global .gitignore to avoid committing them?`,
        default: true,
      },
    ]);

    if (addIgnore) {
      setupGlobalIgnore();
    }
  }
}
