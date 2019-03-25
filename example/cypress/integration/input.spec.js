describe('Attach file to an input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully uploads a file', () => {
    cy.fixture('cy.png', 'base64').then(fileContent => {
      cy.get('[data-cy="input"]').upload(
        { fileContent, fileName: 'cy.png', mimeType: 'image/png' },
        { subjectType: 'input' },
      );
       cy.get('li').contains('cy.png');
    });
  });

  it('successfully uploads multiple files', () => {
    cy.fixture('cy.png', 'base64').then(cyPng => {
      const files = [
        { fileName: 'cy-1.png', fileContent: cyPng, mimeType: 'image/png' },
        { fileName: 'cy-2.png', fileContent: cyPng, mimeType: 'image/png' },
      ];

      cy.get('[data-cy="input"]').upload(files, { subjectType: 'input' });
      cy.get('li').contains('cy-1.png');
      cy.get('li').contains('cy-2.png');
    });
  });
});

describe('Attach file to an hidden input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully uploads a file', () => {
    cy.fixture('cy.png', 'base64').then(fileContent => {
      cy.get('[data-cy="hidden-input"]').upload(
        { fileContent, fileName: 'cy.png', mimeType: 'image/png' },
        { subjectType: 'input' },
      );
       cy.get('.hidden-uploader + ul li').contains('cy.png');
    });
  });

  it('successfully uploads multiple files', () => {
    cy.fixture('cy.png', 'base64').then(cyPng => {
      const files = [
        { fileName: 'cy-1.png', fileContent: cyPng, mimeType: 'image/png' },
        { fileName: 'cy-2.png', fileContent: cyPng, mimeType: 'image/png' },
      ];

      cy.get('[data-cy="hidden-input"]').upload(files, { subjectType: 'input' });
      cy.get('.hidden-uploader + ul li').contains('cy-1.png');
      cy.get('.hidden-uploader + ul li').contains('cy-2.png');
    });
  });
});
