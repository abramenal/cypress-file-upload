describe('Drop file into a dropzone component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  [{ type: 'regular', testId: 'dropzone' }, { type: 'hidden', testId: 'hidden-dropzone' }].forEach(
    ({ type, testId }) => {
      describe(`${type} dropzone`, () => {
        it('receives a single file', () => {
          cy.get(`[data-cy="${testId}"]`).attachFile('cy.png', { subjectType: 'drag-n-drop' });
          cy.get(`li.${type}`).contains('cy.png');
        });

        it('receives multiple files', () => {
          const files = ['cy.png', 'cy.png'];

          cy.get(`[data-cy="${testId}"]`).attachFile(files, { subjectType: 'drag-n-drop' });
          cy.get(`li.${type}`)
            .its('length')
            .should('eq', 2);
        });
      });
    },
  );
});
