import { ERR_TYPES, InternalError } from '../error';

export default (file, allowEmpty) => {
  if (!allowEmpty) {
    const { size } = file;

    if (size === 0) {
      throw new InternalError(ERR_TYPES.INVALID_FILE);
    }
  }
};
