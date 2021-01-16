describe('Drop file into a dropzone component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  [{ type: 'regular', testId: 'dropzone' }, , { type: 'hidden', testId: 'hidden-dropzone' }].forEach(
    ({ type, testId }) => {
      describe(`${type} dropzone`, () => {
        it('receives a single file', () => {
          cy.get(`[data-cy="${testId}"]`).attachFile('cy.png', { subjectType: 'drag-n-drop' });

          cy.get(`li.${type}`).should('have.length', 1);

          cy.get(`li.${type}`).contains('cy.png');
        });

        it('receives multiple files (using chaining)', () => {
          cy.get(`[data-cy="${testId}"]`)
            .attachFile('cy.png', { subjectType: 'drag-n-drop' })
            .attachFile('test.svg', { subjectType: 'drag-n-drop' });

          cy.get(`li.${type}`).should('have.length', 2);

          cy.get(`li.${type}`).contains('cy.png');
          cy.get(`li.${type}`).contains('test.svg');
        });

        it('receives multiple files (using array of fixtures)', () => {
          cy.get(`[data-cy="${testId}"]`).attachFile(['cy.png', 'test.svg'], { subjectType: 'drag-n-drop' });

          cy.get(`li.${type}`).should('have.length', 2);

          cy.get(`li.${type}`).contains('cy.png');
          cy.get(`li.${type}`).contains('test.svg');
        });
      });
    },
  );
});
