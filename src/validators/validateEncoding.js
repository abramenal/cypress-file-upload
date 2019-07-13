import { InternalError, ERR_TYPES } from '../error';
import { ENCODING } from '../constants';

export default encoding => {
  if (!encoding || Object.values(ENCODING).indexOf(encoding) === -1) {
    throw new InternalError(ERR_TYPES.INVALID_ENCODING);
  }
};
