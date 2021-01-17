import { dispatchEvent } from '../../lib/dom';
import { SUBJECT_TYPE, EVENTS_BY_SUBJECT_TYPE } from '../constants';

function attachFilesToElement(element, dataTransfer) {
  if (element.files && element.files.length > 0) {
    /* Keep files that were attached before */
    Array.prototype.forEach.call(element.files, f => dataTransfer.items.add(f));
  }

  // eslint-disable-next-line no-param-reassign
  element.files = dataTransfer.files;
}

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
    attachFilesToElement(inputElement, dataTransfer);

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
      attachFilesToElement(inputElement, dataTransfer);

      if (force) {
        dispatchEvents(inputElement, EVENTS_BY_SUBJECT_TYPE[subjectType], dataTransfer);
      }
    } else {
      const inputElement = subject[0];
      attachFilesToElement(inputElement, dataTransfer);

      if (force) {
        dispatchEvents(inputElement, EVENTS_BY_SUBJECT_TYPE[subjectType], dataTransfer);
      }
    }
  }
}
