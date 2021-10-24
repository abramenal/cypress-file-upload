import { isManualEventHandling } from '../../lib/browser';
import { isElementVisible, isShadowElement } from '../../lib/dom';

export default function getForceValue(subject: JQuery<HTMLElement>): boolean {
  return isManualEventHandling() || !isElementVisible(subject) || isShadowElement(subject);
}
