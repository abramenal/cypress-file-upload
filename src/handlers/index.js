import handleDragDrop from './handleDragDrop';
import handleInput from './handleInput';

const handlerMap = {
  'drag-n-drop': handleDragDrop,
  input: handleInput,
};

const getHandler = subjectType => handlerMap[subjectType];

export { handleDragDrop, handleInput, getHandler };
