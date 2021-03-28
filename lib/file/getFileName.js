const WINDOWS_SEP = '\\';
const UNIX_SEP = '/';

export default function getFileName(filePath, sep = UNIX_SEP, retry = false) {
  if (!filePath) {
    throw new Error('filePath is not provided');
  }

  const lastSeparatorIndex = filePath.lastIndexOf(sep);
  if (lastSeparatorIndex === -1 && retry === true) {
    return filePath;
  }

  if (lastSeparatorIndex === -1) {
    return getFileName(filePath, WINDOWS_SEP, true);
  }

  return filePath.slice(lastSeparatorIndex + 1);
}
