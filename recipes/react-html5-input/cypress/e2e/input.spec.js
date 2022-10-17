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
        cy.get(`[data-cy="${testId}"]`).attachFile('cy.png');

        cy.get(`li.${type}`).should('have.length', 1);

        cy.get(`li.${type}`).contains('cy.png');
      });

      it('receives multiple files (using array of fixtures)', () => {
        cy.get(`[data-cy="${testId}"]`).attachFile(['cy.png', 'test.svg']);

        cy.get(`li.${type}`).should('have.length', 2);

        cy.get(`li.${type}`).contains('cy.png');
        cy.get(`li.${type}`).contains('test.svg');
      });
    });
  });
});
