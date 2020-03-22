import { isManualEventHandling } from '../../lib/browser';
import { isElementVisible, isShadowElement } from '../../lib/dom';

export default function getForceValue(subject) {
  return isManualEventHandling() || !isElementVisible(subject) || isShadowElement(subject);
}
