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
});
