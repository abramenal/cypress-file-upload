describe('Repeated uploads', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('[data-cy="input"]').attachFile('cy.png');
  });

  it('does not preserve previously attached files', () => {
    cy.get('[data-cy="input"]').attachFile('test.json');

    cy.get('li').should('have.length', 1);
    cy.get('li').contains('test.json');
  });
});
