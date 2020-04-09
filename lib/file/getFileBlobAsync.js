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

export default function getFileBlobAsync({ fileName, fileContent, mimeType, encoding, window }) {
  const getBlob = ENCODING_TO_BLOB_GETTER[encoding];

  return getBlob(fileContent, mimeType).then(blob => {
    // we must use the file constructor from the subject window so this check `file instanceof File`, can pass
    const file = new window.File([blob], fileName, { type: mimeType });
    return file;
  });
}
