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
  [SUBJECT_TYPE.DRAG_N_DROP]: ['dragstart', 'drag', 'dragenter', 'drop', 'dragleave', 'dragend'],
};
