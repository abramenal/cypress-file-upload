export default function isManualEventTrigger({ window, force }) {
  if (force) {
    /* https://github.com/abramenal/cypress-file-upload/issues/41 */
    return true;
  }

  /* https://github.com/abramenal/cypress-file-upload/issues/34 */

  const chromeRegExp = /(chrome\/)(\d+)/i;
  const chromeMatcher = window.navigator.userAgent.match(chromeRegExp);

  if (!chromeMatcher) {
    return false;
  }

  const chromeVersion = Number.parseInt(chromeMatcher[2], 10);
  return chromeVersion >= 73;
}
