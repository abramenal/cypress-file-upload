import { getFileName } from '../../lib/file';

export default function getFixtureInfo(fixtureInput) {
  if (typeof fixtureInput === 'string') {
    return {
      filePath: fixtureInput,
      encoding: '',
      mimeType: '',
      fileName: getFileName(fixtureInput),
    };
  }

  return {
    filePath: fixtureInput.filePath,
    encoding: fixtureInput.encoding || '',
    mimeType: fixtureInput.mimeType || '',
    fileName: fixtureInput.fileName || getFileName(fixtureInput.filePath),
    fileContent: fixtureInput.fileContent,
    lastModified: fixtureInput.lastModified,
  };
}
