import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { defaultIgnoreRules } from './constants';

export function setupGlobalIgnore(): void {
  const globalIgnorePath = path.join(os.homedir(), '.gitignore_global');
  const defaultIgnores = defaultIgnoreRules;

  let existing: string = '';
  if (fs.existsSync(globalIgnorePath)) {
    existing = fs.readFileSync(globalIgnorePath, 'utf-8');
  }

  const toAdd = defaultIgnores.filter((line) => !existing.includes(line)).join('\n');

  if (toAdd) {
    fs.appendFileSync(globalIgnorePath, `\n${toAdd}\n`);
    console.log(`✅ Added chatpack ignores to global .gitignore at ${globalIgnorePath}`);
  }

  execSync('git config --global core.excludesfile ~/.gitignore_global');
}
