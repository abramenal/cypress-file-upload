export default function getFixtureInfo(fixtureInput) {
  if (typeof fixtureInput === 'string') {
    return {
      filePath: fixtureInput,
      encoding: '',
      mimeType: '',
    };
  }

  return {
    filePath: fixtureInput.filePath,
    encoding: fixtureInput.encoding || '',
    mimeType: fixtureInput.mimeType || '',
  };
}
