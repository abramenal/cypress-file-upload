import { getFileName } from '../../lib/file';
import { FileEncodings } from '../../lib/file/constants';

export interface FixtureInfo {
  filePath: string;
  encoding?: FileEncodings;
  mimeType: string;
  fileName: string;
  fileContent?: string;
  lastModified?: number;
}

export default function getFixtureInfo(fixtureInput: string | FixtureInfo): FixtureInfo {
  if (typeof fixtureInput === 'string') {
    return {
      filePath: fixtureInput,
      mimeType: '',
      fileName: getFileName(fixtureInput),
    };
  }

  return {
    filePath: fixtureInput.filePath,
    mimeType: fixtureInput.mimeType || '',
    fileName: fixtureInput.fileName || getFileName(fixtureInput.filePath),
    fileContent: fixtureInput.fileContent,
    lastModified: fixtureInput.lastModified,
  };
}
