/**
 * @description determines if element is visible in DOM
 *
 * @param {Cypress.Subject} element
 * @returns {Boolean}
 */
export default function isShadowElement(element) {
  if (!element) {
    throw new Error('Element cannot be empty');
  }

  return Cypress.dom.isDetached(element);
}
