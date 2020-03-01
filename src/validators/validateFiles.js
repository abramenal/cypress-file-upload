import { ERR_TYPES, InternalError } from '../error';

export default (files, allowEmpty) => {
  if (!allowEmpty) {
    files.forEach(file => {
      const { size } = file;

      if (size === 0) {
        throw new InternalError(ERR_TYPES.INVALID_FILE);
      }
    });
  }
};
