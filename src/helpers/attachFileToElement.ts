import { dispatchEvent } from '../../lib/dom';
import { EVENTS_BY_SUBJECT_TYPE, HtmlSubjectType } from '../constants';
import { isBrowserFirefox } from '../../lib/browser';

function dispatchEvents(element: HTMLElement, events: Array<string>, dataTransfer: DataTransfer) {
  events.forEach(event => {
    dispatchEvent(element, event, dataTransfer);
  });
}

function getEventsBySubjectType(subjectType: HtmlSubjectType) {
  const events = EVENTS_BY_SUBJECT_TYPE[subjectType];

  /**
   * @see https://github.com/abramenal/cypress-file-upload/issues/293
   */
  if (subjectType === HtmlSubjectType.dragAndDrop && isBrowserFirefox()) {
    events.push('change');
  }

  return events;
}

export default function attachFileToElement(
  subject: JQuery<HTMLElement>,
  {
    files,
    subjectType,
    force,
    window,
  }: {
    files: File[];
    subjectType: HtmlSubjectType;
    force: boolean;
    window: Cypress.AUTWindow;
  },
) {
  const dataTransfer = new window.DataTransfer();
  files.forEach(f => dataTransfer.items.add(f));

  cy.stub(dataTransfer, 'items').callsFake(() =>
    Array.from(dataTransfer.items).map((item: DataTransferItem): DataTransferItem => {
      cy.stub(item, 'webkitGetAsEntry').callsFake(() => ({
        isFile: true,
        file: (callback: Function) => callback(item.getAsFile()),
      }));

      return item;
    }),
  );

  cy.stub(dataTransfer, 'types').value(['Files']);

  if (subjectType === HtmlSubjectType.input) {
    const inputElement = subject[0] as HTMLInputElement;
    inputElement.files = dataTransfer.files;

    if (force) {
      dispatchEvents(inputElement, getEventsBySubjectType(subjectType), dataTransfer);
    }
  } else if (subjectType === HtmlSubjectType.dragAndDrop) {
    const inputElements = subject[0].querySelectorAll('input[type="file"]');

    /**
     * Try to find underlying file input element, as likely drag-n-drop component uses it internally
     * Otherwise dispatch all events on subject element
     */
    const inputElement = (inputElements.length === 1 ? inputElements[0] : subject[0]) as HTMLInputElement;
    inputElement.files = dataTransfer.files;

    if (force) {
      dispatchEvents(inputElement, getEventsBySubjectType(subjectType), dataTransfer);
    }
  }
}
