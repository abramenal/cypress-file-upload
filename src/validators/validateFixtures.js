import { ERR_TYPES, InternalError } from '../error';
import { ENCODING } from '../../lib/file/constants';

export default function validateFixtures(fixtures) {
  const allowedEncodings = Object.values(ENCODING);

  fixtures.forEach(fixture => {
    const { filePath, encoding } = fixture;

    if (encoding && !allowedEncodings.includes(encoding)) {
      throw new InternalError(ERR_TYPES.INVALID_FILE_ENCODING);
    }

    if (typeof filePath !== 'string') {
      throw new InternalError(ERR_TYPES.INVALID_FILE_PATH);
    }
  });
}
