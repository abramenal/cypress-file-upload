import getFixtureContent from './getFixtureContent';
import getFileMimeType from './getFileMimeType';
import getFileEncoding from './getFileEncoding';
import getFileBlobAsync from './getFileBlobAsync';

export default function resolveFixture(fixture, window) {
  const { filePath, encoding, mimeType, fileName, lastModified } = fixture;

  const fileMimeType = mimeType || getFileMimeType(filePath);
  const fileEncoding = encoding || getFileEncoding(filePath);
  const fileLastModified = lastModified || Date.now();

  return new Cypress.Promise(resolve =>
    getFixtureContent({
      filePath,
      fileContent: fixture.fileContent,
      fileEncoding,
    })
      .then(fileContent =>
        getFileBlobAsync({
          fileContent,
          fileName,
          mimeType: fileMimeType,
          encoding: fileEncoding,
          lastModified: fileLastModified,
          window,
        }),
      )
      .then(resolve),
  );
}
