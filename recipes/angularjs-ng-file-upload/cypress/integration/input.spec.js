describe('Drop', () => {
  const UPLOAD_URL = 'https://angular-file-upload-cors-srv.appspot.com/upload';
  const UPLOAD_RESPONSE = {
    result: [
      {
        fieldName: 'file',
        name: 'cy.png',
        size: '372900',
      },
    ],
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully uploads a file', () => {
    cy.server();
    cy.route('POST', UPLOAD_URL, UPLOAD_RESPONSE);

    cy.get('[data-cy="file-input"]')
      /**
       * ng-file-upload puts a hidden HTML5 input into the DOM
       * so in order to simulate user's action we take that hidden input as upload target
       */
      .last()
      .attachFile('cypress/fixtures/cy.png');

    cy.get('[data-cy="file-result-valid"]').children().should('have.length', 1);
    cy.get('[data-cy="file-result-valid"]').contains('cy.png');
  });

  it('successfully uploads a fixture', () => {
    cy.server();
    cy.route('POST', UPLOAD_URL, UPLOAD_RESPONSE);

    cy.get('[data-cy="file-input"]')
      /**
       * ng-file-upload puts a hidden HTML5 input into the DOM
       * so in order to simulate user's action we take that hidden input as upload target
       */
      .last()
      .attachFixture('cy.png');

    cy.get('[data-cy="file-result-valid"]').children().should('have.length', 1);
    cy.get('[data-cy="file-result-valid"]').contains('cy.png');
  });

  it('successfully uploads multiple files (using array of files)', () => {
    cy.server();
    cy.route('POST', UPLOAD_URL, UPLOAD_RESPONSE);

    cy.get('[data-cy="file-input"]')
      /**
       * ng-file-upload puts a hidden HTML5 input into the DOM
       * so in order to simulate user's action we take that hidden input as upload target
       */
      .last()
      .attachFile(['cypress/fixtures/cy.png', 'cypress/fixtures/test.svg']);

    cy.get('[data-cy="file-result-valid"]').children().should('have.length', 2);

    cy.get('[data-cy="file-result-valid"]').contains('cy.png');
    cy.get('[data-cy="file-result-valid"]').contains('test.svg');
  });

  it('successfully uploads multiple fixtures (using array of fixtures)', () => {
    cy.server();
    cy.route('POST', UPLOAD_URL, UPLOAD_RESPONSE);

    cy.get('[data-cy="file-input"]')
      /**
       * ng-file-upload puts a hidden HTML5 input into the DOM
       * so in order to simulate user's action we take that hidden input as upload target
       */
      .last()
      .attachFixture(['cy.png', 'test.svg']);

    cy.get('[data-cy="file-result-valid"]').children().should('have.length', 2);

    cy.get('[data-cy="file-result-valid"]').contains('cy.png');
    cy.get('[data-cy="file-result-valid"]').contains('test.svg');
  });
});
