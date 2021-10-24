/**
 * Determines if element is visible in DOM.
 */
export default function isShadowElement(element: HTMLElement | JQuery<HTMLElement>): boolean {
  if (!element) {
    throw new Error('Element cannot be empty');
  }

  return Cypress.dom.isDetached(element);
}
