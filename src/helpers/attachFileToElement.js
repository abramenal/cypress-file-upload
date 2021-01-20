import { dispatchEvent } from '../../lib/dom';
import { SUBJECT_TYPE, EVENTS_BY_SUBJECT_TYPE } from '../constants';

function dispatchEvents(element, events, dataTransfer) {
  events.forEach(event => {
    dispatchEvent(element, event, dataTransfer);
  });
}

export default function attachFileToElement(subject, { files, subjectType, force, window }) {
  const dataTransfer = new window.DataTransfer();
  files.forEach(f => dataTransfer.items.add(f));

  if (subjectType === SUBJECT_TYPE.INPUT) {
    const inputElement = subject[0];
    inputElement.files = dataTransfer.files;

    if (force) {
      dispatchEvents(inputElement, EVENTS_BY_SUBJECT_TYPE[subjectType], dataTransfer);
    }
  } else if (subjectType === SUBJECT_TYPE.DRAG_N_DROP) {
    const inputElements = subject[0].querySelectorAll('input[type="file"]');

    /**
     * Try to find underlying file input element, as likely drag-n-drop component uses it internally
     * Otherwise dispatch all events on subject element
     */
    if (inputElements.length === 1) {
      const inputElement = inputElements[0];
      inputElement.files = dataTransfer.files;

      if (force) {
        dispatchEvents(inputElement, EVENTS_BY_SUBJECT_TYPE[subjectType], dataTransfer);
      }
    } else {
      const inputElement = subject[0];
      inputElement.files = dataTransfer.files;

      if (force) {
        dispatchEvents(inputElement, EVENTS_BY_SUBJECT_TYPE[subjectType], dataTransfer);
      }
    }
  }
}
