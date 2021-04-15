import path from 'path';

export default function getFixtureInfo(fixtureInput, folderName) {
  if (typeof fixtureInput === 'string') {
    const filePath = folderName ? `${folderName}/${fixtureInput}` : fixtureInput;

    return {
      filePath,
      encoding: '',
      mimeType: '',
      fileName: path.basename(fixtureInput),
      ...(folderName ? { webkitRelativePath: filePath } : {}),
    };
  }

  const filePath = folderName ? `${folderName}/${fixtureInput.filePath}` : fixtureInput.filePath;

  return {
    filePath,
    encoding: fixtureInput.encoding || '',
    mimeType: fixtureInput.mimeType || '',
    fileName: fixtureInput.fileName || path.basename(fixtureInput.filePath),
    fileContent: fixtureInput.fileContent,
    lastModified: fixtureInput.lastModified,
    ...(folderName ? { webkitRelativePath: filePath } : {}),
  };
}
