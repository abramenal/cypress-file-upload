/**
 * Determines if element is visible in DOM.
 */
export default function isElementVisible(element: HTMLElement | JQuery<HTMLElement>): boolean {
  if (!element) {
    throw new Error('Element cannot be empty');
  }

  /* running isVisible command on detached element throws an error */
  return Cypress.dom.isAttached(element) && Cypress.dom.isVisible(element);
}
