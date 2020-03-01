describe('Attach file to an input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  [{ type: 'regular', testId: 'input' }, { type: 'hidden', testId: 'hidden-input' }].forEach(({ type, testId }) => {
    describe(`${type} input`, () => {
      it('receives a single file', () => {
        cy.get(`[data-cy="${testId}"]`).attachFile('cy.png');
        cy.get(`li.${type}`).contains('cy.png');
      });

      it('receives multiple files', () => {
        const files = ['cy.png', 'cy.png'];
        cy.get(`[data-cy="${testId}"]`).attachFile(files);
        cy.wait(1000);
        cy.get(`li.${type}`)
          .its('length')
          .should('eq', 2);
      });
    });
  });
});
