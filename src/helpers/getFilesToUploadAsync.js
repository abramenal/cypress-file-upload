import { getFileBlobAsync, getFileMimeType, getFileEncoding } from '../../lib/file';

export default function getFilesToUploadAsync(files) {
  return Cypress.Promise.all(
    files.map(({ filePath, encoding }) => {
      const mimeType = getFileMimeType(filePath);
      const fileEncoding = encoding || getFileEncoding(filePath);

      return new Cypress.Promise(resolve => {
        Cypress.cy.fixture(filePath, fileEncoding).then(fileContent => {
          getFileBlobAsync({
            filePath,
            fileContent,
            mimeType,
            encoding: fileEncoding,
          }).then(fileBlob => {
            resolve(fileBlob);
          });
        });
      });
    }),
  );
}
