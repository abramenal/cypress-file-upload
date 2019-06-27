import handleDragDrop from './handleDragDrop';
import handleInput from './handleInput';
import handleShadowDragDrop from './handleShadowDragDrop';
import handleShadowInput from './handleShadowInput';

import { ERR_TYPES, InternalError } from '../error';

const handlerMap = {
  'drag-n-drop': {
    dom: handleDragDrop,
    shadow: handleShadowDragDrop,
  },
  'input': {
    dom: handleInput,
    shadow: handleShadowInput,
  },
};

const getHandler = ({ subjectType, subjectNature }) => {
  const handlerType = handlerMap[subjectType];

  if (!handlerType) {
    throw new InternalError(ERR_TYPES.INVALID_SUBJECT_TYPE);
  }

  const handler = handlerType[subjectNature];

  if (!handler) {
    throw new InternalError(ERR_TYPES.INVALID_SUBJECT_NATURE);
  }

  return handler;
};

export default getHandler;
