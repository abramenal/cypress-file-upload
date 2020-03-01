/**
 * @description determines if element is visible in DOM
 *
 * @param {Cypress.Subject} element
 * @returns {Boolean}
 */
export default function isElementVisible(element) {
  if (!element) {
    throw new Error('Element cannot be empty');
  }

  /* running isVisible command on detached element throws an error */
  return Cypress.dom.isAttached(element) && Cypress.dom.isVisible(element);
}
