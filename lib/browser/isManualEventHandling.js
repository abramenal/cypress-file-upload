const BROWSER_CHROME = 'chrome';
const BROWSER_ELECTRON = 'electron';

export default function isManualEventHandling() {
  const { name, majorVersion, isHeaded } = Cypress.browser;

  if (name === BROWSER_CHROME && majorVersion < 73) {
    /**
     * Chrome <73 triggers 'change' event automatically
     * https://github.com/abramenal/cypress-file-upload/issues/34
     */
    return false;
  }

  if (name === BROWSER_ELECTRON && isHeaded) {
    return false;
  }

  return true;
}
