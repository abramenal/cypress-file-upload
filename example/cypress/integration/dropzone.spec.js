describe('Drop file into dropzone', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully uploads a file', () => {
    cy.fixture('cy.png', 'base64').then(fileContent => {
      cy.get('[data-cy="dropzone"]').upload(
        { fileContent, fileName: 'cy.png', mimeType: 'image/png' },
        { subjectType: 'drag-n-drop' },
      );
    });
  });

  it('successfully uploads multiple files', () => {
    cy.fixture('cy.png', 'base64').then(cyPng => {
      const files = [
        { fileName: 'cy-1.png', fileContent: cyPng, mimeType: 'image/png' },
        { fileName: 'cy-2.png', fileContent: cyPng, mimeType: 'image/png' },
      ];

      cy.get('[data-cy="dropzone"]').upload(files, { subjectType: 'drag-n-drop' });
    });
  });
});
