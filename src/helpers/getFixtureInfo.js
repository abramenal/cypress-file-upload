import path from 'path';

export default function getFixtureInfo(fixtureInput) {
  if (typeof fixtureInput === 'string') {
    return {
      filePath: fixtureInput,
      encoding: '',
      mimeType: '',
      fileName: path.basename(fixtureInput),
    };
  }

  return {
    filePath: fixtureInput.filePath,
    encoding: fixtureInput.encoding || '',
    mimeType: fixtureInput.mimeType || '',
    fileName: fixtureInput.fileName || path.basename(fixtureInput.filePath),
    fileContent: fixtureInput.fileContent,
    lastModified: fixtureInput.lastModified,
  };
}
