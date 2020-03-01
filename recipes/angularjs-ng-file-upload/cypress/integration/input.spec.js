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
      .attachFile('cy.png');

    cy.get('[data-cy="file-result"]').contains('cy.png');
  });
});
