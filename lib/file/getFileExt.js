export default function getFileExt(filePath) {
  if (!filePath) {
    return '';
  }

  const pos = filePath.lastIndexOf('.');

  if (pos === -1) {
    return '';
  }

  return filePath.slice(pos + 1);
}
