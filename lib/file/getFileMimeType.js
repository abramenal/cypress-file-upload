import { extname } from 'path';
import { getType } from 'mime';

export default function getFileMimeType(filePath) {
  const extension = extname(filePath).slice(1);
  const mimeType = getType(extension);

  return mimeType;
}
