import { HtmlSubjectType } from '../constants';
import { ERR_TYPES, InternalError } from '../error';

export default ({
  subjectType,
  force,
  allowEmpty,
}: {
  subjectType: unknown;
  force: unknown;
  allowEmpty: unknown;
}): boolean => {
  if (Object.values(HtmlSubjectType).indexOf(String(subjectType) as HtmlSubjectType) === -1) {
    throw new InternalError(ERR_TYPES.INVALID_SUBJECT_TYPE);
  }

  if (typeof force !== 'boolean') {
    throw new InternalError(ERR_TYPES.INVALID_FORCE);
  }

  if (typeof allowEmpty !== 'boolean') {
    throw new InternalError(ERR_TYPES.INVALID_ALLOW_EMPTY);
  }

  return true;
};
