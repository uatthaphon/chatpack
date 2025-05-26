import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { zip } from 'zip-a-folder';
import { defaultIgnoreRules } from './constants';

export async function zipProject(): Promise<void> {
  const folder: string = path.basename(process.cwd());
  const zipName: string = `${folder}-context.zip`;
  const ignoreFile: string = path.join(process.cwd(), '.chatpackignore');
  const tmpDir: string = path.join(process.cwd(), '.chatpack_tmp');

  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }
  fs.mkdirSync(tmpDir);

  const excludeArgs: string[] = fs.existsSync(ignoreFile)
    ? [`--exclude-from=${ignoreFile}`]
    : defaultIgnoreRules.map((rule) => `--exclude=${rule}`);

  const rsyncCommand: string = ['rsync', '-av', ...excludeArgs, './', tmpDir].join(' ');

  execSync(rsyncCommand, { stdio: 'inherit' });

  await zip(tmpDir, zipName);
  fs.rmSync(tmpDir, { recursive: true });

  console.log(`✅ Zip created: ${zipName}`);
}
