import handleDragDrop from './handleDragDrop';
import handleInput from './handleInput';
import handleShadowDragDrop from './handleShadowDragDrop';
import handleShadowInput from './handleShadowInput';
import { SUBJECT_NATURE, SUBJECT_TYPE } from '../constants';

const handlerMap = {
  [SUBJECT_TYPE.INPUT]: {
    [SUBJECT_NATURE.DOM]: handleInput,
    [SUBJECT_NATURE.SHADOW]: handleShadowInput,
  },
  [SUBJECT_TYPE.DRAG_N_DROP]: {
    [SUBJECT_NATURE.DOM]: handleDragDrop,
    [SUBJECT_NATURE.SHADOW]: handleShadowDragDrop,
  },
};

export default ({ subjectType, subjectNature }) => handlerMap[subjectType][subjectNature];
