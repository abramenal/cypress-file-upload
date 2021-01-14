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
        cy.get(`li.${type}`).contains('cy.png');
      });

      it('receives multiple files', () => {
        cy.get(`[data-cy="${testId}"]`)
          .attachFile('cy.png')
          .attachFile('test.svg');

        cy.get(`li.${type}`)
          .its('length')
          .should('eq', 2);
      });

      it('receives multiple concurrent files', () => {
        cy.get(`[data-cy="${testId}"]`).attachFile(['cy.png', 'test.svg']);

        cy.get(`li.${type}`)
          .its('length')
          .should('eq', 2);
      });
    });
  });
});
