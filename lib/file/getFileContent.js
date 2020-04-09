export default function getFileContent({ filePath, fileContent, fileEncoding }) {
  // allows users to provide file content.
  if (fileContent) {
    return Cypress.Promise.resolve(fileContent);
  }

  return Cypress.cy.fixture(filePath, fileEncoding);
}
