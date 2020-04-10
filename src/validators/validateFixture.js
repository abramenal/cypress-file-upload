import { ERR_TYPES, InternalError } from '../error';
import { ENCODING } from '../../lib/file/constants';

const ALLOWED_ENCODINGS = Object.values(ENCODING);

export default function validateFixtures(fixture) {
  const { filePath, fileName, encoding, mimeType, fileContent } = fixture;

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
}
