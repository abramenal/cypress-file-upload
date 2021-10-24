import { FileEncodings } from './constants';

import getFileMimeType from './getFileMimeType';
import getFileEncoding from './getFileEncoding';
import getFileBlobAsync from './getFileBlob';

export interface UserFixture {
  filePath: string;
  encoding?: FileEncodings;
  mimeType?: string;
  fileName: string;
  lastModified?: number;
}

export default function resolveFixture(
  { filePath, encoding, mimeType, fileName, lastModified }: UserFixture,
  window: Cypress.AUTWindow,
): Promise<File> {
  const fileMimeType = mimeType ?? getFileMimeType(filePath);
  const fileEncoding = encoding ?? getFileEncoding(filePath);
  const fileLastModified = lastModified ?? Date.now();

  return new Cypress.Promise(resolve =>
    cy
      .fixture<string>(filePath, fileEncoding)
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
