import { isManualEventHandling } from '../../lib/browser';
import { isElementVisible, isShadowElement } from '../../lib/dom';

export default function getForceValue(subject, forceInputValue) {
  return new Cypress.Promise(resolve => {
    if (forceInputValue) {
      /**
       * If 'force' attribute was provided, trigger events manually
       * https://github.com/abramenal/cypress-file-upload/issues/41
       */
      return resolve(forceInputValue);
    }

    const forceValue = isManualEventHandling() || !isElementVisible(subject) || isShadowElement(subject);

    return resolve(forceValue);
  });
}
