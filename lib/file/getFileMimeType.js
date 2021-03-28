import { getType } from 'mime';
import getFileExtension from './getFileExtension';

export default function getFileMimeType(filePath) {
  const extension = getFileExtension(filePath);
  const mimeType = getType(extension);

  return mimeType;
}
