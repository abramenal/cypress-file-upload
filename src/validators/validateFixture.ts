import { FileEncodings } from '../../lib/file/constants';
import { ERR_TYPES, InternalError } from '../error';
import { FixtureInfo } from '../helpers/getFixtureInfo';

const ALLOWED_ENCODINGS = Object.values(FileEncodings);

export default function validateFixtures(fixture: FixtureInfo): boolean {
  const { filePath, fileName, encoding, mimeType, fileContent, lastModified } = fixture;

  if (encoding && !ALLOWED_ENCODINGS.includes(encoding)) {
    throw new InternalError(ERR_TYPES.INVALID_FILE_ENCODING);
  }

  if (typeof filePath !== 'string' && !fileContent) {
    throw new InternalError(ERR_TYPES.INVALID_FILE_PATH);
  }

  if (typeof mimeType !== 'string') {
    throw new InternalError(ERR_TYPES.INVALID_MIME_TYPE);
  }

  if (!filePath && !fileName) {
    throw new InternalError(ERR_TYPES.MISSING_FILE_NAME_OR_PATH);
  }

  if (lastModified && typeof lastModified !== 'number') {
    throw new InternalError(ERR_TYPES.INVALID_LAST_MODIFIED);
  }

  return true;
}
