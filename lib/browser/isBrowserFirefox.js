const BROWSER_FIREFOX = 'firefox';

export default function isBrowserFirefox() {
  const { name } = Cypress.browser;

  return name === BROWSER_FIREFOX;
}
