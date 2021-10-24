export enum HtmlSubjectType {
  input = 'input',
  dragAndDrop = 'drag-n-drop',
}

export const DEFAULT_PROCESSING_OPTIONS = Object.freeze({
  subjectType: HtmlSubjectType.input,
  force: false,
  allowEmpty: false,
});

export const EVENTS_BY_SUBJECT_TYPE: Record<Required<HtmlSubjectType>, string[]> = {
  [HtmlSubjectType.input]: ['change'],
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/DragEvent
   */
  [HtmlSubjectType.dragAndDrop]: ['dragstart', 'drag', 'dragenter', 'drop', 'dragleave', 'dragend'],
};
