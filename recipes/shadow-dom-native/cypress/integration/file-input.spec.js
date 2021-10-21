describe('Attach file to a shadow dom input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders input correctly', () => {
    cy.shadowGet('file-input').shadowContains('Upload a file from below');
  });

  it('successfully uploads a file', () => {
    cy.shadowGet('file-input').shadowFind('input').attachFile('cypress/fixtures/cy.png');

    cy.shadowGet('file-input').shadowFind('ul').shadowFind('li').shadowContains('cy.png');
  });

  it('successfully uploads a fixture', () => {
    cy.shadowGet('file-input').shadowFind('input').attachFixture('cy.png');

    cy.shadowGet('file-input').shadowFind('ul').shadowFind('li').shadowContains('cy.png');
  });

  it('successfully uploads multiple files (using array of files)', () => {
    cy.shadowGet('file-input')
      .shadowFind('input')
      .attachFile(['cypress/fixtures/cy.png', 'cypress/fixtures/empty.txt'], { allowEmpty: true });

    cy.shadowGet('file-input').shadowFind('ul').shadowFind('li').shadowContains('cy.png');

    cy.shadowGet('file-input').shadowFind('ul').shadowFind('li').shadowContains('empty.txt');
  });

  it('successfully uploads multiple fixtures (using array of fixtures)', () => {
    cy.shadowGet('file-input').shadowFind('input').attachFixture(['cy.png', 'empty.txt'], { allowEmpty: true });

    cy.shadowGet('file-input').shadowFind('ul').shadowFind('li').shadowContains('cy.png');

    cy.shadowGet('file-input').shadowFind('ul').shadowFind('li').shadowContains('empty.txt');
  });

  it('successfully uploads an empty file when allowEmpty is true', () => {
    cy.shadowGet('file-input').shadowFind('input').attachFile('cypress/fixtures/empty.txt', { allowEmpty: true });

    cy.shadowGet('file-input').shadowFind('ul').shadowContains('empty.txt');
  });

  it('successfully uploads an empty fixture when allowEmpty is true', () => {
    cy.shadowGet('file-input').shadowFind('input').attachFixture('empty.txt', { allowEmpty: true });

    cy.shadowGet('file-input').shadowFind('ul').shadowContains('empty.txt');
  });
});
