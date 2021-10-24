const BROWSER_FIREFOX = 'firefox';

export default function isBrowserFirefox(): boolean {
  const { name } = Cypress.browser;

  return name === BROWSER_FIREFOX;
}
