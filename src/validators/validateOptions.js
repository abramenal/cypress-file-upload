import { SUBJECT_TYPE } from '../constants';
import { ERR_TYPES, InternalError } from '../error';

export default ({ subjectType, force, allowEmpty }) => {
  if (Object.values(SUBJECT_TYPE).indexOf(subjectType) === -1) {
    throw new InternalError(ERR_TYPES.INVALID_SUBJECT_TYPE);
  }

  if (typeof force !== 'boolean') {
    throw new InternalError(ERR_TYPES.INVALID_FORCE);
  }

  if (typeof allowEmpty !== 'boolean') {
    throw new InternalError(ERR_TYPES.INVALID_ALLOW_EMPTY);
  }
};
