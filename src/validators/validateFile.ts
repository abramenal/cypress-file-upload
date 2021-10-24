import { ERR_TYPES, InternalError } from '../error';

export default (file: File, allowEmpty: boolean): boolean => {
  if (!allowEmpty) {
    const { size } = file;

    if (size === 0) {
      throw new InternalError(ERR_TYPES.INVALID_FILE);
    }
  }

  return true;
};
