import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { defaultIgnoreRules } from '../../lib/constants';
import { setupGlobalIgnore } from '../../lib/ignore';

jest.mock('fs');
jest.mock('os');
jest.mock('path');
jest.mock('child_process');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedOs = os as jest.Mocked<typeof os>;
const mockedPath = path as jest.Mocked<typeof path>;
const mockedExecSync = execSync as jest.Mock;

describe('setupGlobalIgnore', () => {
  const fakePath = '/fake/home/.gitignore_global';

  beforeEach(() => {
    jest.clearAllMocks();
    mockedOs.homedir.mockReturnValue('/fake/home');
    mockedPath.join.mockImplementation((...args) => args.join('/'));
  });

  it('should append all ignore rules if file does not exist', () => {
    mockedFs.existsSync.mockReturnValue(false);
    mockedFs.appendFileSync.mockImplementation(() => {});
    setupGlobalIgnore();
    defaultIgnoreRules.forEach((rule) => {
      expect(mockedFs.appendFileSync).toHaveBeenCalledWith(fakePath, expect.stringContaining(rule));
    });
    expect(mockedExecSync).toHaveBeenCalledWith(
      'git config --global core.excludesfile ~/.gitignore_global'
    );
  });

  it('should append only missing rules if file exists', () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('**/.cache\n**/.output\n');
    mockedFs.appendFileSync.mockImplementation(() => {});
    setupGlobalIgnore();
    expect(mockedFs.appendFileSync).toHaveBeenCalledWith(
      fakePath,
      expect.stringContaining('.chatpackignore')
    );
    expect(mockedFs.appendFileSync).not.toHaveBeenCalledWith(
      fakePath,
      expect.stringContaining('**/.cache')
    );
    expect(mockedExecSync).toHaveBeenCalledWith(
      'git config --global core.excludesfile ~/.gitignore_global'
    );
  });
});
