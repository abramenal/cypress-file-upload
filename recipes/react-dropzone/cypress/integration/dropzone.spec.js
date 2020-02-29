describe('Drop file into a dropzone component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  [
    { type: 'regular', testId: 'dropzone', force: false },
    { type: 'hidden', testId: 'hidden-dropzone', force: true },
  ].forEach(({ type, testId, force }) => {
    describe(`${type} dropzone`, () => {
      it('receives a single file', () => {
        cy.fixture('cy.png', 'base64').then(fileContent => {
          cy.get(`[data-cy="${testId}"]`).upload(
            { fileContent, fileName: 'cy.png', mimeType: 'image/png' },
            { subjectType: 'drag-n-drop', force },
          );
          cy.get(`li.${type}`).contains('cy.png');
        });
      });

      it('receives multiple files', () => {
        cy.fixture('cy.png', 'base64').then(cyPng => {
          const files = [
            { fileName: 'cy-1.png', fileContent: cyPng, mimeType: 'image/png' },
            { fileName: 'cy-2.png', fileContent: cyPng, mimeType: 'image/png' },
          ];

          cy.get(`[data-cy="${testId}"]`).upload(files, { subjectType: 'drag-n-drop', force });
          cy.get(`li.${type}`).contains('cy-1.png');
          cy.get(`li.${type}`).contains('cy-2.png');
        });
      });
    });
  });
});
