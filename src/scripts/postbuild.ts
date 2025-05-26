import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('templates');
const destDir = path.resolve('dist/templates');

if (fs.existsSync(srcDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.cpSync(srcDir, destDir, { recursive: true });
  console.log('✅ Copied templates to dist/templates');
} else {
  console.warn('⚠️  Skipping postbuild: templates folder not found');
}
