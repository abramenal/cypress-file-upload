export default function getFixtureInfo(fixtureInput) {
  if (Array.isArray(fixtureInput)) {
    return fixtureInput.map(fixtureConfig => {
      if (typeof fixtureConfig === 'string') {
        return {
          filePath: fixtureConfig,
          encoding: '',
        };
      }

      return fixtureConfig;
    });
  }

  if (typeof fixtureInput === 'string') {
    return [
      {
        filePath: fixtureInput,
        encoding: '',
      },
    ];
  }

  return [fixtureInput];
}
