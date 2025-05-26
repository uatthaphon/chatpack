import { spawnSync } from 'child_process';
import path from 'path';

const cliPath = path.resolve(__dirname, '../../../dist/bin/chatpack.js');

describe('chatpack CLI', () => {
  it('should display help output', () => {
    const result = spawnSync('node', [cliPath, '--help'], { encoding: 'utf-8' });
    expect(result.stdout).toContain('Usage: chatpack');
    expect(result.status).toBe(0);
  });

  it('should display version number', () => {
    const result = spawnSync('node', [cliPath, '--version'], { encoding: 'utf-8' });
    expect(result.stdout.trim()).toMatch(/^\d+\.\d+\.\d+$/);
    expect(result.status).toBe(0);
  });

  it('should error on unknown command', () => {
    const result = spawnSync('node', [cliPath, 'unknowncmd'], { encoding: 'utf-8' });
    expect(result.stderr).toContain('error: unknown command');
    expect(result.status).not.toBe(0);
  });

  it('should run chatpack create --only-md', () => {
    const result = spawnSync('node', [cliPath, 'create', '--only-md'], { encoding: 'utf-8' });
    expect(result.status).toBe(0);
  });

  it('should run chatpack create --only-ignore', () => {
    const result = spawnSync('node', [cliPath, 'create', '--only-ignore'], { encoding: 'utf-8' });
    expect(result.status).toBe(0);
  });
});
