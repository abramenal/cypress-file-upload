import { extname } from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { getType } from 'mime';

export default function getFileMimeType(filePath) {
  const extension = extname(filePath).slice(1);
  const mimeType = getType(extension);

  return mimeType;
}
