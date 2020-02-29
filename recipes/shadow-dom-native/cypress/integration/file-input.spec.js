describe('Attach file to a shadow dom input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders input correctly', () => {
    cy.shadowGet('file-input').shadowContains('Upload a file from below');
  });

  it('successfully uploads a file', () => {
    cy.fixture('cy.png', 'base64').then(fileContent => {
      cy.shadowGet('file-input')
        .shadowFind('input')
        .upload(
          { fileContent, fileName: 'cy.png', mimeType: 'image/png' },
          { subjectNature: 'shadow', subjectType: 'input' },
        );

      cy.shadowGet('file-input')
        .shadowFind('ul')
        .shadowContains('cy.png');
    });
  });

  it('successfully uploads multiple files', () => {
    cy.fixture('cy.png', 'base64').then(cyPng => {
      const files = [
        { fileName: 'cy-1.png', fileContent: cyPng, mimeType: 'image/png' },
        { fileName: 'cy-2.png', fileContent: cyPng, mimeType: 'image/png' },
      ];

      cy.shadowGet('file-input')
        .shadowFind('input')
        .upload(files, { subjectNature: 'shadow', subjectType: 'input' });

      cy.shadowGet('file-input')
        .shadowFind('ul')
        .shadowFirst()
        .shadowContains('cy-1.png');

      cy.shadowGet('file-input')
        .shadowFind('ul')
        .shadowLast()
        .shadowContains('cy-2.png');
    });
  });

  it('successfully uploads an empty file when allowEmpty is true', () => {
    cy.fixture('empty.txt', 'base64').then(fileContent => {
      cy.shadowGet('file-input')
        .shadowFind('input')
        .upload(
          { fileContent, fileName: 'empty.txt', mimeType: 'text/plain' },
          { subjectNature: 'shadow', subjectType: 'input', allowEmpty: true },
        );

      cy.shadowGet('file-input')
        .shadowFind('ul')
        .shadowContains('empty.txt');
    });
  });
});
