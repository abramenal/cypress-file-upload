describe('Attach folder to an input element', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('receives a single file', () => {
    cy.get(`[data-cy="folder-input"]`).attachFolder('folder');

    cy.get('li.folder').should('have.length', 2);

    cy.get('li.folder').contains('cy.png');
    cy.get('li.folder').contains('cy2.png');
  });
});
