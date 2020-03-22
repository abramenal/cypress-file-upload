import path from 'path';

import { ENCODING } from './constants';

const ENCODING_TO_BLOB_GETTER = {
  [ENCODING.ASCII]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.BASE64]: (fileContent, mimeType) => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
  [ENCODING.BINARY]: (fileContent, mimeType) => Cypress.Blob.binaryStringToBlob(fileContent, mimeType),
  [ENCODING.HEX]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.LATIN1]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.UTF8]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.UTF_8]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.UCS2]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.UCS_2]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.UTF16LE]: fileContent => Cypress.Promise.resolve(fileContent),
  [ENCODING.UTF_16LE]: fileContent => Cypress.Promise.resolve(fileContent),
};

export default function getFileBlobAsync({ filePath, fileContent, mimeType, encoding }) {
  const fileName = path.basename(filePath);

  const getBlob = ENCODING_TO_BLOB_GETTER[encoding];

  return getBlob(fileContent, mimeType).then(blob => {
    const file = new File([blob], fileName, { type: mimeType });
    return file;
  });
}
