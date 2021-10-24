// eslint-disable-next-line import/no-extraneous-dependencies
import { getType } from 'mime';

import getFileExtension from './getFileExtension';

export default function getFileMimeType(filePath: string): string | undefined {
  const extension = getFileExtension(filePath);
  const mimeType = getType(extension);

  return mimeType ?? undefined;
}
