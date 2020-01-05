import { SUBJECT_TYPE, SUBJECT_NATURE } from '../constants';
import { ERR_TYPES, InternalError } from '../error';

const INPUT_TAG_REGEX = /input|button/i;

const validationScheme = {
  [SUBJECT_TYPE.INPUT]: {
    [SUBJECT_NATURE.DOM]: element => INPUT_TAG_REGEX.test(element.tagName),
    [SUBJECT_NATURE.SHADOW]: () => true,
  },
  [SUBJECT_TYPE.DRAG_N_DROP]: {
    [SUBJECT_NATURE.DOM]: () => true,
    [SUBJECT_NATURE.SHADOW]: () => true,
  },
};

export default ({ subject, subjectType, subjectNature }) => {
  if (!subject || !subject[0] || !validationScheme[subjectType][subjectNature](subject[0])) {
    throw new InternalError(ERR_TYPES.INVALID_SUBJECT);
  }
};
