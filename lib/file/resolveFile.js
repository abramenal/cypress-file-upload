import getFileContent from './getFileContent';
import getFileMimeType from './getFileMimeType';
import getFileEncoding from './getFileEncoding';
import getFileBlobAsync from './getFileBlobAsync';

export default function resolveFile(fixture, window) {
  const { filePath, encoding, mimeType, fileName } = fixture;

  const fileMimeType = mimeType || getFileMimeType(filePath);
  const fileEncoding = encoding || getFileEncoding(filePath);

  return new Cypress.Promise(resolve =>
    getFileContent({
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
          window,
        }),
      )
      .then(resolve),
  );
}
