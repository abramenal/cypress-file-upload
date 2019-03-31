export default ({ window, subject }, { files, force }) => {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  const input = subject[0];
  input.files = dataTransfer.files;

  if (isManualTriggerRequired()) {
    return cy.wrap(subject, { log: false }).trigger('change', {
      force: true,
    });
  }

  return null;

  function isManualTriggerRequired() {
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
};
