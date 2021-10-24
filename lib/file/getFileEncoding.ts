import { FileEncodings, FileExtension } from './constants';
import getFileExtension from './getFileExtension';

/*
 * Copied from https://github.com/cypress-io/cypress/blob/develop/packages/server/lib/fixture.coffee#L104
 */
const EXTENSION_TO_ENCODING: Record<FileExtension, FileEncodings> = {
  [FileExtension.json]: FileEncodings.utf8,
  [FileExtension.js]: FileEncodings.utf8,
  [FileExtension.coffee]: FileEncodings.utf8,
  [FileExtension.html]: FileEncodings.utf8,
  [FileExtension.txt]: FileEncodings.utf8,
  [FileExtension.csv]: FileEncodings.utf8,
  [FileExtension.png]: FileEncodings.base64,
  [FileExtension.jpg]: FileEncodings.base64,
  [FileExtension.jpeg]: FileEncodings.base64,
  [FileExtension.gif]: FileEncodings.base64,
  [FileExtension.tif]: FileEncodings.base64,
  [FileExtension.tiff]: FileEncodings.base64,
  [FileExtension.zip]: FileEncodings.base64,

  /*
   * Other extensions that are not supported by cy.fixture by default:
   */
  [FileExtension.pdf]: FileEncodings.utf8,
  [FileExtension.vcf]: FileEncodings.utf8,
  [FileExtension.svg]: FileEncodings.utf8,
  [FileExtension.xls]: FileEncodings.binary,
  [FileExtension.xlsx]: FileEncodings.binary,
  [FileExtension.doc]: FileEncodings.binary,
  [FileExtension.docx]: FileEncodings.binary,
  [FileExtension.mp3]: FileEncodings.binary,
  [FileExtension.mp4]: FileEncodings.binary,
};

const DEFAULT_ENCODING = FileEncodings.utf8;

const isKnownExtension = (extension: string): extension is FileExtension =>
  Object.values(FileExtension).includes(extension as FileExtension);

export default function getFileEncoding(filePath?: string) {
  const extension = getFileExtension(filePath);

  if (isKnownExtension(extension)) {
    return EXTENSION_TO_ENCODING[extension];
  }

  return DEFAULT_ENCODING;
}
