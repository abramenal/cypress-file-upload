import { ERR_TYPES, InternalError } from '../error';
import { ENCODING } from '../../lib/file/constants';

const ALLOWED_ENCODINGS = Object.values(ENCODING);

export default function validateFixtures(fixture) {
  const { filePath, encoding } = fixture;

  if (encoding && !ALLOWED_ENCODINGS.includes(encoding)) {
    throw new InternalError(ERR_TYPES.INVALID_FILE_ENCODING);
  }

  if (typeof filePath !== 'string') {
    throw new InternalError(ERR_TYPES.INVALID_FILE_PATH);
  }
}
