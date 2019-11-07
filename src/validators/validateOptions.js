import { SUBJECT_TYPE, SUBJECT_NATURE } from '../constants';
import { ERR_TYPES, InternalError } from '../error';

export default ({ subjectType, subjectNature, force, allowEmpty, events }) => {
  if (Object.values(SUBJECT_TYPE).indexOf(subjectType) === -1) {
    throw new InternalError(ERR_TYPES.INVALID_SUBJECT_TYPE);
  }

  if (Object.values(SUBJECT_NATURE).indexOf(subjectNature) === -1) {
    throw new InternalError(ERR_TYPES.INVALID_SUBJECT_NATURE);
  }

  if (typeof force !== 'boolean') {
    throw new InternalError(ERR_TYPES.INVALID_FORCE);
  }
  
  if (typeof allowEmpty !== 'boolean') {
    throw new InternalError(ERR_TYPES.INVALID_ALLOW_EMPTY);
  }
  
  if (!(Array.isArray(events) && events.every(event => typeof event === 'string'))) {
    throw new InternalError(ERR_TYPES.INVALID_EVENTS);
  }
};
