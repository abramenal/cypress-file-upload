describe('Uploads a file with certain MIME type', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const files = [
    {
      testFileExt: 'PNG',
      fileName: 'cy.png',
      mimeType: 'image/png',
      encoding: 'base64',
    },
    {
      testFileExt: 'CSV',
      fileName: 'test.csv',
      mimeType: 'text/comma-separated-values',
      encoding: 'ascii',
    },
    {
      testFileExt: 'JSON',
      fileName: 'test.json',
      mimeType: 'application/json',
      encoding: 'utf-8',
    },
  ];

  files.forEach(({ testFileExt, fileName, mimeType, encoding }) => {
    it(`successfullt uploads a ${testFileExt} file`, () => {
      cy.fixture(fileName, encoding).then(fileContent => {
        cy.get('[data-cy="input"]').upload({ fileContent, fileName, mimeType }, { subjectType: 'input' });
        cy.get('li').contains(fileName);
      });
    });
  });
});
