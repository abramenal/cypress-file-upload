import { wrapBlob } from './common';

export default function getFixtureContent({ filePath, fileContent, fileEncoding }) {
  // allows users to provide file content.
  if (fileContent) {
    return wrapBlob(fileContent);
  }

  return Cypress.cy.fixture(filePath, fileEncoding);
}
