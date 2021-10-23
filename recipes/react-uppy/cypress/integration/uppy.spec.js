describe('Drop file into a dropzone component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe(`upload files`, () => {
    it('receives a single file', () => {
      cy.get(`[data-cy="dropzone"]`).attachFile('cy.png', { subjectType: 'drag-n-drop' });

      cy.get(`li`).should('have.length', 1);

      cy.get(`li`).contains('cy.png');
    });

    it('receives multiple files (using array of fixtures)', () => {
      cy.get(`[data-cy="dropzone"]`).attachFile(['cy.png', 'test.svg'], { subjectType: 'drag-n-drop' });

      cy.get(`li`).should('have.length', 2);

      cy.get(`li`).contains('cy.png');
      cy.get(`li`).contains('test.svg');
    });
  });
});
