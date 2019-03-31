describe('Uploads a file with certain MIME type', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const files = [
    {
      testFileExt: 'PNG',
      fileName: 'cy.png',
      mimeType: 'image/png',
    },
    {
      testFileExt: 'CSV (ASCII)',
      fileName: 'test.ascii.csv',
      mimeType: 'text/comma-separated-values',
      encoding: 'ascii',
    },
    {
      testFileExt: 'CSV (UTF8)',
      fileName: 'test.utf8.csv',
      mimeType: 'text/comma-separated-values',
    },
    {
      testFileExt: 'JSON',
      fileName: 'test.json',
      mimeType: 'application/json',
    },
  ];

  files.forEach(({ testFileExt, fileName, mimeType, encoding }) => {
    it(`successfullt uploads a ${testFileExt} file`, () => {
      cy.fixture(fileName, encoding).then(fileContent => {
        cy.get('[data-cy="input"]').upload({ fileContent, fileName, mimeType, encoding }, { subjectType: 'input' });
        cy.get('li').contains(fileName);
      });
    });
  });
});
