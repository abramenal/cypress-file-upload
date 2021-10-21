describe('Attach file to an input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  [
    { type: 'regular', testId: 'input' },
    { type: 'hidden', testId: 'hidden-input' },
  ].forEach(({ type, testId }) => {
    describe(`${type} input`, () => {
      it('receives a single file', () => {
        cy.get(`[data-cy="${testId}"]`).attachFile('cypress/fixtures/cy.png');

        cy.get(`li.${type}`).should('have.length', 1);

        cy.get(`li.${type}`).contains('cy.png');
      });

      it('receives a single fixture', () => {
        cy.get(`[data-cy="${testId}"]`).attachFixture('cy.png');

        cy.get(`li.${type}`).should('have.length', 1);

        cy.get(`li.${type}`).contains('cy.png');
      });

      it('receives multiple files (using array of files)', () => {
        cy.get(`[data-cy="${testId}"]`).attachFile(['cypress/fixtures/cy.png', 'cypress/fixtures/test.svg']);

        cy.get(`li.${type}`).should('have.length', 2);

        cy.get(`li.${type}`).contains('cy.png');
        cy.get(`li.${type}`).contains('test.svg');
      });

      it('receives multiple fixtures (using array of fixtures)', () => {
        cy.get(`[data-cy="${testId}"]`).attachFixture(['cy.png', 'test.svg']);

        cy.get(`li.${type}`).should('have.length', 2);

        cy.get(`li.${type}`).contains('cy.png');
        cy.get(`li.${type}`).contains('test.svg');
      });
    });
  });
});
