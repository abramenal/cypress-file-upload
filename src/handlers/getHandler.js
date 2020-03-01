import handleDragDrop from './handleDragDrop';
import handleInput from './handleInput';
import handleShadowDragDrop from './handleShadowDragDrop';
import handleShadowInput from './handleShadowInput';

import { SUBJECT_TYPE } from '../constants';

import { isShadowElement } from '../../lib/dom';

const SUBJECT_DOM = 'dom';
const SUBJECT_SHADOW = 'shadow';

const SUBJECT_TYPE_HANDLER = {
  [SUBJECT_TYPE.INPUT]: {
    [SUBJECT_DOM]: handleInput,
    [SUBJECT_SHADOW]: handleShadowInput,
  },
  [SUBJECT_TYPE.DRAG_N_DROP]: {
    [SUBJECT_DOM]: handleDragDrop,
    [SUBJECT_SHADOW]: handleShadowDragDrop,
  },
};

export default function getHandler(subject, subjectType) {
  const subjectNature = isShadowElement(subject) ? SUBJECT_SHADOW : SUBJECT_DOM;
  const handler = SUBJECT_TYPE_HANDLER[subjectType][subjectNature];

  return handler;
}
