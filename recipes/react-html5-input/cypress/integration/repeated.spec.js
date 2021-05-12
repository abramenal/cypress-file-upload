describe('Repeated uploads', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy="input"]').attachFile('cypress/fixtures/cy.png');
    cy.get('[data-cy="input"]').attachFixture('test.svg');
  });

  it('does not preserve previously attached files', () => {
    cy.get('[data-cy="input"]').attachFile('cypress/fixtures/test.json');

    cy.get('li').should('have.length', 1);
    cy.get('li').contains('test.json');
  });

  it('does not preserve previously attached fixtures', () => {
    cy.get('[data-cy="input"]').attachFixture('test.json');

    cy.get('li').should('have.length', 1);
    cy.get('li').contains('test.json');
  });
});
