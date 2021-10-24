const BROWSER_CHROME = 'chrome';

export default function isManualEventHandling(): boolean {
  const { name, majorVersion } = Cypress.browser;

  if (name === BROWSER_CHROME && majorVersion < 73) {
    /**
     * Chrome <73 triggers 'change' event automatically
     * https://github.com/abramenal/cypress-file-upload/issues/34
     */
    return false;
  }

  return true;
}
