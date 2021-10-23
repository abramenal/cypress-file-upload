import { dispatchEvent } from '../../lib/dom';
import { EVENTS_BY_SUBJECT_TYPE, SUBJECT_TYPE } from '../constants';
import { isBrowserFirefox } from '../../lib/browser';

function dispatchEvents(element, events, dataTransfer) {
  events.forEach(event => {
    dispatchEvent(element, event, dataTransfer);
  });
}

function getEventsBySubjectType(subjectType) {
  const events = EVENTS_BY_SUBJECT_TYPE[subjectType];

  /**
   * @see https://github.com/abramenal/cypress-file-upload/issues/293
   */
  if (subjectType === SUBJECT_TYPE.DRAG_N_DROP && isBrowserFirefox()) {
    events.push('change');
  }

  return events;
}

export default function attachFileToElement(subject, { files, subjectType, force, window }) {
  const dataTransfer = new window.DataTransfer();
  files.forEach(f => dataTransfer.items.add(f));

  cy.stub(
    dataTransfer,
    'items',
    Array.from(dataTransfer.items).map(item => {
      cy.stub(item, 'webkitGetAsEntry', () => ({
        isFile: true,
        file: callback => callback(item.getAsFile()),
      }));
      return item;
    }),
  );

  if (subjectType === SUBJECT_TYPE.INPUT) {
    const inputElement = subject[0];
    inputElement.files = dataTransfer.files;

    if (force) {
      dispatchEvents(inputElement, getEventsBySubjectType(subjectType), dataTransfer);
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
        dispatchEvents(inputElement, getEventsBySubjectType(subjectType), dataTransfer);
      }
    } else {
      const inputElement = subject[0];
      inputElement.files = dataTransfer.files;

      if (force) {
        dispatchEvents(inputElement, getEventsBySubjectType(subjectType), dataTransfer);
      }
    }
  }
}
