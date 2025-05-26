import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('templates');
const destDir = path.resolve('dist/templates');

fs.mkdirSync(destDir, { recursive: true });
fs.cpSync(srcDir, destDir, { recursive: true });

console.log('✅ Copied templates to dist/templates');
