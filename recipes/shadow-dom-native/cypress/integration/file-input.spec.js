describe('Attach file to a shadow dom input element', () => {
  beforeEach(() => {
    cy.visit('/');
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

      cy.document({ log: false })
        .shadowGet('file-input ul')
        .shadowContains('cy.png');
    });
  });

  it('successfully uploads multiple files', () => {
    cy.fixture('cy.png', 'base64').then(cyPng => {
      const files = [
        { fileName: 'cy-1.png', fileContent: cyPng, mimeType: 'image/png' },
        { fileName: 'cy-2.png', fileContent: cyPng, mimeType: 'image/png' },
      ];

      cy.document({ log: false })
        .shadowGet('file-input input')
        .upload(files, { subjectNature: 'shadow', subjectType: 'input' });

      cy.document({ log: false })
        .shadowGet('file-input ul')
        .shadowFirst()
        .shadowContains('cy-1.png');

      cy.document({ log: false })
        .shadowGet('file-input ul')
        .shadowLast()
        .shadowContains('cy-2.png');
    });
  });

  it('successfully uploads an empty file when allowEmpty is true', () => {
    cy.fixture('empty.txt', 'base64').then(fileContent => {
      cy.document({ log: false })
        .shadowGet('file-input input', { selectMultiple: false })
        .upload(
          { fileContent, fileName: 'empty.txt', mimeType: 'text/plain' },
          { subjectNature: 'shadow', subjectType: 'input', allowEmpty: true },
        );

      cy.document({ log: false })
        .shadowGet('file-input ul')
        .shadowContains('empty.txt');
    });
  });
});
