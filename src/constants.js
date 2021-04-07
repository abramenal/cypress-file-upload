export const DEFAULT_PROCESSING_OPTIONS = Object.freeze({
  subjectType: 'input',
  force: false,
  allowEmpty: false,
});

export const SUBJECT_TYPE = Object.freeze({
  INPUT: 'input',
  DRAG_N_DROP: 'drag-n-drop',
});

export const EVENTS_BY_SUBJECT_TYPE = {
  [SUBJECT_TYPE.INPUT]: ['change'],
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
   */
  [SUBJECT_TYPE.DRAG_N_DROP]: [
    'drag',
    'dragend',
    'dragenter',
    'dragexit',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
  ],
};
