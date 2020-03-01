describe('Attach file to a shadow dom input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders input correctly', () => {
    cy.shadowGet('file-input').shadowContains('Upload a file from below');
  });

  it('successfully uploads a file', () => {
    cy.shadowGet('file-input')
      .shadowFind('input')
      .attachFile('cy.png');

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowContains('cy.png');
  });

  it('successfully uploads multiple files', () => {
    const files = ['cy.png', 'cy.png'];

    cy.shadowGet('file-input')
      .shadowFind('input')
      .attachFile(files);

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowFirst()
      .shadowFind('li')
      .its('length')
      .should('eq', 2);

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowLast()
      .shadowFind('li')
      .its('length')
      .should('eq', 2);
  });

  it('successfully uploads an empty file when allowEmpty is true', () => {
    cy.shadowGet('file-input')
      .shadowFind('input')
      .attachFile('empty.txt', { allowEmpty: true });

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowContains('empty.txt');
  });
});
