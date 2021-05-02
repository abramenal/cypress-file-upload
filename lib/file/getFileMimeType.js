// eslint-disable-next-line import/no-extraneous-dependencies
import { getType } from 'mime';

import getFileExt from './getFileExt';

export default function getFileMimeType(filePath) {
  const extension = getFileExt(filePath);
  const mimeType = getType(extension);

  return mimeType;
}
