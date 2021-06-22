describe('Uploads a file with certain MIME type', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const files = [
    {
      testFileExt: 'PNG',
      fileName: 'cy.png',
      filePath: 'cypress/fixtures/cy.png',
    },
    {
      testFileExt: 'CSV (ASCII)',
      fileName: 'test.ascii.csv',
      filePath: 'cypress/fixtures/test.ascii.csv',
      encoding: 'ascii',
    },
    {
      testFileExt: 'CSV (UTF8)',
      fileName: 'test.utf8.csv',
      filePath: 'cypress/fixtures/test.utf8.csv',
    },
    {
      testFileExt: 'JSON',
      fileName: 'test.json',
      filePath: 'cypress/fixtures/test.json',
    },
    {
      testFileExt: 'SVG',
      fileName: 'test.svg',
      filePath: 'cypress/fixtures/test.svg',
      mimeType: 'text/csv',
    },
  ];

  const fixtures = [
    {
      testFileExt: 'PNG',
      filePath: 'cy.png',
    },
    {
      testFileExt: 'CSV (ASCII)',
      filePath: 'test.ascii.csv',
      encoding: 'ascii',
    },
    {
      testFileExt: 'CSV (UTF8)',
      filePath: 'test.utf8.csv',
    },
    {
      testFileExt: 'JSON',
      filePath: 'test.json',
    },
    {
      testFileExt: 'SVG',
      filePath: 'test.svg',
      mimeType: 'text/csv',
    },
  ];

  files.forEach(({ fileName, testFileExt, filePath, encoding, mimeType }) => {
    it(`successfully uploads a ${testFileExt} file`, () => {
      cy.get('[data-cy="input"]').attachFile({ filePath, encoding, mimeType});
      cy.get('li').contains(fileName);
    });
  });

  fixtures.forEach(({ testFileExt, filePath, encoding, mimeType }) => {
    it(`successfully uploads a ${testFileExt} fixture`, () => {
      cy.get('[data-cy="input"]').attachFixture({ filePath, encoding, mimeType });
      cy.get('li').contains(filePath);
    });
  });
});
