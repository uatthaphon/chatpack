import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import { createContextFile } from '../../lib/create';
import { setupGlobalIgnore } from '../../lib/ignore';

jest.mock('fs');
jest.mock('path');
jest.mock('inquirer');
jest.mock('../../lib/ignore');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;
const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;
const mockedIgnore = setupGlobalIgnore as jest.Mock;

describe('createContextFile', () => {
  const filename = 'CHATPACK.md';
  const filePath = `/test/${filename}`;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(process, 'cwd').mockReturnValue('/test');

    mockedPath.resolve.mockImplementation((...args) => args.join('/'));
  });

  it('should return early if file already exists', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedInquirer.prompt.mockResolvedValue({ addIgnore: false });

    await createContextFile(filename);

    expect(mockedFs.existsSync).toHaveBeenCalledWith(filePath);
    expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
  });

  it('should create the file and add to global ignore if user agrees', async () => {
    mockedFs.existsSync.mockReturnValue(false);
    mockedFs.readFileSync.mockReturnValue('template content');
    mockedFs.writeFileSync.mockImplementation(() => {});
    mockedInquirer.prompt.mockResolvedValue({ addIgnore: true });

    await createContextFile(filename);

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(filePath, 'template content');
    expect(mockedIgnore).toHaveBeenCalled();
  });

  it('should create the file and not add to ignore if user declines', async () => {
    mockedFs.existsSync.mockReturnValue(false);
    mockedFs.readFileSync.mockReturnValue('template content');
    mockedFs.writeFileSync.mockImplementation(() => {});
    mockedInquirer.prompt.mockResolvedValue({ addIgnore: false });

    await createContextFile(filename);

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(filePath, 'template content');
    expect(mockedIgnore).not.toHaveBeenCalled();
  });

  it('should only create .chatpackignore when --only-ignore is set', async () => {
    mockedFs.existsSync.mockImplementation(
      (inputPath) => typeof inputPath === 'string' && inputPath.includes('CHATPACK.md')
    );
    mockedFs.writeFileSync.mockImplementation(() => {});

    await createContextFile(filename, { onlyIgnore: true });

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
      '/test/.chatpackignore',
      expect.stringContaining('node_modules')
    );
  });

  it('should only create CHATPACK.md when --only-md is set', async () => {
    mockedFs.existsSync.mockImplementation(
      (inputPath) => typeof inputPath === 'string' && inputPath.includes('.chatpackignore')
    );
    mockedFs.readFileSync.mockReturnValue('template content');
    mockedFs.writeFileSync.mockImplementation(() => {});

    await createContextFile(filename, { onlyMd: true });

    expect(mockedFs.writeFileSync).toHaveBeenCalledWith(filePath, 'template content');
  });

  it('should skip both if files already exist', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.writeFileSync.mockImplementation(() => {});

    await createContextFile(filename);

    expect(mockedFs.writeFileSync).not.toHaveBeenCalled();
    expect(mockedIgnore).not.toHaveBeenCalled();
  });
});
