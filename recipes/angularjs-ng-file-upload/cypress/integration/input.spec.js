describe('Drop', () => {
  const UPLOAD_URL = 'https://angular-file-upload-cors-srv.appspot.com/upload';

  beforeEach(() => {
    cy.visit('/');
    cy.server();
    cy.route('POST', UPLOAD_URL, {}).as('post');
  });

  describe('single files', () => {
    it('successfully uploads a file', () => {
      cy.get('[data-cy="file-input"]')
        /**
         * ng-file-upload puts a hidden HTML5 input into the DOM
         * so in order to simulate user's action we take that hidden input as upload target
         */
        .last()
        .attachFile('cy.png');

      cy.get('[data-cy="file-result"]').contains('cy.png');
    });
  });

  describe('multiple files', () => {
    it('chaining calls POST twice', () => {
      cy.get('[data-cy="file-input"]')
        /**
         * ng-file-upload puts a hidden HTML5 input into the DOM
         * so in order to simulate user's action we take that hidden input as upload target
         */
        .last()
        .attachFile('cy.png')
        .attachFile('test.svg');

      cy.wait('@post').should(xhr => {
        expect(Array.from(xhr.request.body.keys())).to.have.length(1);
      });

      cy.wait('@post').should(xhr => {
        expect(Array.from(xhr.request.body.keys())).to.have.length(2); // BUG: see https://github.com/abramenal/cypress-file-upload/issues/204
      });

      cy.get('[data-cy="file-result"]').contains('cy.png');
    });

    it('can accept array posts once', () => {
      cy.get('[data-cy="file-input"]')
        /**
         * ng-file-upload puts a hidden HTML5 input into the DOM
         * so in order to simulate user's action we take that hidden input as upload target
         */
        .last()
        .attachFile(['cy.png', 'test.svg']);

      cy.wait('@post').should(xhr => {
        expect(Array.from(xhr.request.body.keys())).to.have.length(2);
      });

      cy.get('[data-cy="file-result"]').contains('cy.png');
    });
  });
});
