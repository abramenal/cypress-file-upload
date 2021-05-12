import { wrapBlob } from './common';

export default function getFixtureFileContent({ filePath, fileContent, fileEncoding }) {
  // allows users to provide file content.
  if (fileContent) {
    return wrapBlob(fileContent);
  }

  return Cypress.cy.fixture(filePath, fileEncoding);
}
