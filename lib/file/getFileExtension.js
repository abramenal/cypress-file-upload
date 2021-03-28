export default function getFileExtension(filePath) {
  const lastPeriodIndex = filePath.lastIndexOf(filePath);
  if (lastPeriodIndex === -1) {
    return '';
  }

  return filePath.slice(lastPeriodIndex + 1) || '';
}
