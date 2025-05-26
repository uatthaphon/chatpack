import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { zip as zipFolder } from 'zip-a-folder';
import { defaultIgnoreRules } from '../../lib/constants';
import { zipProject } from '../../lib/zip';

jest.mock('fs');
jest.mock('path');
jest.mock('zip-a-folder', () => ({
  zip: jest.fn(),
}));
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;
const mockedZip = zipFolder as jest.Mock;
const mockedExecSync = execSync as jest.Mock;

describe('zipProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(process, 'cwd').mockReturnValue('/test-project');
    mockedPath.basename.mockReturnValue('test-project');
    mockedPath.join.mockImplementation((...args) => args.join('/'));
    mockedFs.existsSync.mockReturnValue(false);
    mockedFs.mkdirSync.mockImplementation(() => undefined);
    mockedFs.rmSync.mockImplementation(() => {});
  });

  it('should remove tmpDir if it already exists', async () => {
    mockedFs.existsSync.mockImplementation(
      (inputPath) => typeof inputPath === 'string' && inputPath.includes('.chatpack_tmp')
    );

    await zipProject();

    expect(mockedFs.rmSync).toHaveBeenCalledWith('/test-project/.chatpack_tmp', {
      recursive: true,
    });
  });

  it('should call execSync and zip with correct paths', async () => {
    await zipProject();

    const expectedCommand = [
      'rsync -av',
      ...defaultIgnoreRules.map((rule) => `--exclude=${rule}`),
      './',
      '/test-project/.chatpack_tmp',
    ].join(' ');

    expect(mockedExecSync).toHaveBeenCalledWith(expectedCommand, { stdio: 'inherit' });
    expect(mockedZip).toHaveBeenCalledWith(
      '/test-project/.chatpack_tmp',
      'test-project-context.zip'
    );
    expect(mockedFs.rmSync).toHaveBeenCalledWith('/test-project/.chatpack_tmp', {
      recursive: true,
    });
  });

  it('should use --exclude-from if .chatpackignore exists', async () => {
    mockedFs.existsSync.mockImplementation(
      (inputPath) => typeof inputPath === 'string' && inputPath.includes('.chatpackignore')
    );

    await zipProject();

    expect(mockedExecSync).toHaveBeenCalledWith(
      'rsync -av --exclude-from=/test-project/.chatpackignore ./ /test-project/.chatpack_tmp',
      { stdio: 'inherit' }
    );
  });
});
