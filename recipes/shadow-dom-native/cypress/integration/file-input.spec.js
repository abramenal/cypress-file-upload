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
      .shadowFind('li')
      .shadowContains('cy.png');
  });

  it('successfully uploads multiple files', () => {
    cy.shadowGet('file-input')
      .shadowFind('input')
      .attachFile('cy.png')
      .attachFile('empty.txt', { allowEmpty: true });

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowContains('cy.png');

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowContains('empty.txt');
  });

  it('successfully uploads multiple concurrent files', () => {
    cy.shadowGet('file-input')
      .shadowFind('input')
      .attachFile(['cy.png', 'empty.txt'], { allowEmpty: true });

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowContains('cy.png');

    cy.shadowGet('file-input')
      .shadowFind('ul')
      .shadowFind('li')
      .shadowContains('empty.txt');
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
