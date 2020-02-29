/**
 * Some browsers detect "the need" of triggering DOM events automatically,
 * but for some we need to do it manually (in order to let attached event handlers execute properly)
 *
 * @param {Object} window
 * @param {Boolean} force
 */
export default function isManualEventTrigger({ window, force }) {
  if (force) {
    /**
     * If 'force' attribute was provided, trigger events manually
     * https://github.com/abramenal/cypress-file-upload/issues/41
     */
    return true;
  }

  const chromeRegExp = /(chrome\/)(\d+)/i;
  const chromeMatcher = window.navigator.userAgent.match(chromeRegExp);

  const electronRegExp = /(chrome\/)(\d+)/i;
  const electronMatcher = window.navigator.userAgent.match(electronRegExp);

  if (electronMatcher) {
    /**
     * Manual trigger is required for headless mode,
     * however it is hard to distinguish between headed and headless mode,
     * so doing that for both
     */
    return true;
  }

  if (!chromeMatcher) {
    /**
     * For rest of browsers (like Firefox, Edge, etc.) we trigger events manually
     * https://github.com/abramenal/cypress-file-upload/issues/154
     */
    return true;
  }

  /**
   * Chrome <73 triggers 'change' event automatically
   * https://github.com/abramenal/cypress-file-upload/issues/34
   */
  const chromeVersion = Number.parseInt(chromeMatcher[2], 10);
  return chromeVersion >= 73;
}
