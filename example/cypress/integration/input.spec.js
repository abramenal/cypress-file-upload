describe('Attach file to an input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully uploads a file', () => {
    cy.fixture('cy.png', 'base64').then(fileContent => {
      cy.get('[data-cy="input"]').upload(
        { fileContent, fileName: 'cy.png', mimeType: 'image/png' },
        { uploadType: 'input' },
      );
    });
  });

  it('successfully uploads multiple files', () => {
    cy.fixture('cy.png', 'base64').then(cyPng => {
      cy.fixture('cy-logo-text.png', 'base64').then(cyLogoTextPng => {
        cy.fixture('docker.png', 'base64').then(dockerPng => {
          const files = [
            { fileName: 'cy.png', fileContent: cyPng, mimeType: 'image/png' },
            { fileName: 'cy-logo-text.png', fileContent: cyLogoTextPng, mimeType: 'image/png' },
            { fileName: 'docker.png', fileContent: dockerPng, mimeType: 'image/png' },
          ];
          cy.get('[data-cy="input"]').uploadFiles(files, { uploadType: 'input' });
        });
      });
    });
  });
});
