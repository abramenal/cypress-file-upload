import { FileEncodings, FileExtension } from './constants';

import getFileExtension from './getFileExtension';

type FileContentsGetterFunc = (fileContent: string, mimeType?: string) => string | Blob;

const ENCODING_TO_FILE_CONTENTS_GETTER: Record<FileEncodings, FileContentsGetterFunc> = {
  'ascii': (fileContent: string) => fileContent,
  'base64': (fileContent: string, mimeType?: string) => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
  'binary': (fileContent: string, mimeType?: string) => Cypress.Blob.binaryStringToBlob(fileContent, mimeType),
  'hex': (fileContent: string) => fileContent,
  'latin1': (fileContent: string) => fileContent,
  'utf8': (fileContent: string) => fileContent,
  'utf-8': (fileContent: string) => fileContent,
  'ucs2': (fileContent: string) => fileContent,
  'ucs-2': (fileContent: string) => fileContent,
  'utf16le': (fileContent: string) => fileContent,
  'utf-16le': (fileContent: string) => fileContent,
};

export default function getFileBlob({
  fileName,
  fileContent,
  mimeType,
  encoding,
  window,
  lastModified,
}: {
  fileName: string;
  fileContent: string;
  mimeType?: string;
  encoding: FileEncodings;
  window: Cypress.AUTWindow;
  lastModified?: number;
}): File {
  const getFileContents = ENCODING_TO_FILE_CONTENTS_GETTER[encoding];

  let fileContents = getFileContents(fileContent, mimeType);

  // https://github.com/abramenal/cypress-file-upload/issues/175
  if (getFileExtension(fileName) === FileExtension.json) {
    fileContents = JSON.stringify(fileContent, null, 2);
  }

  // we must use the file constructor from the subject window so this check `file instanceof File`, can pass
  const file = new window.File([fileContents], fileName, { type: mimeType, lastModified });

  return file;
}
