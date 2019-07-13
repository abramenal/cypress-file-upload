describe('Attach file to a shadow dom input element', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 1000 });
  });

  it('renders input correctly', () => {
    cy.document({ log: false })
      .shadowGet('file-input')
      .shadowContains('Upload a file from below');
  });

  it('successfully uploads a file', () => {
    cy.fixture('cy.png', 'base64').then(fileContent => {
      cy.document({ log: false })
        .shadowGet('file-input input', { selectMultiple: false })
        .upload(
          { fileContent, fileName: 'cy.png', mimeType: 'image/png' },
          { subjectNature: 'shadow', subjectType: 'input' },
        );

      cy.wait(1000);

      cy.document({ log: false })
        .shadowGet('file-input li')
        .shadowContains('cy-1.png');
    });
  });

  it.skip('successfully uploads multiple files', () => {
    cy.fixture('cy.png', 'base64').then(cyPng => {
      const files = [
        { fileName: 'cy-1.png', fileContent: cyPng, mimeType: 'image/png' },
        { fileName: 'cy-2.png', fileContent: cyPng, mimeType: 'image/png' },
      ];

      cy.document({ log: false })
        .shadowGet('file-input input')
        .upload(files, { subjectNature: 'shadow', subjectType: 'input' });

      cy.document({ log: false })
        .shadowGet('file-input li')
        .shadowFirst()
        .shadowContains('cy-1.png');

      cy.document({ log: false })
        .shadowGet('file-input li')
        .shadowLast()
        .shadowContains('cy-2.png');
    });
  });
});
