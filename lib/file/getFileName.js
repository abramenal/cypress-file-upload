const UNIX_SEP = '/';
const WIN_SEP = '\\';

export default function getFileName(filePath) {
  if (!filePath) {
    return '';
  }

  let indexSep = filePath.lastIndexOf(UNIX_SEP);
  if (indexSep === -1) {
    indexSep = filePath.lastIndexOf(WIN_SEP);
  }

  if (indexSep === -1) {
    return filePath;
  }

  return filePath.slice(indexSep + 1);
}
