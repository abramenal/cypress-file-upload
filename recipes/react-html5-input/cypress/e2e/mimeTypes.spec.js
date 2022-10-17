describe('Uploads a file with certain MIME type', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const files = [
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

  files.forEach(({ testFileExt, filePath, encoding, mimeType }) => {
    it(`successfully uploads a ${testFileExt} file`, () => {
      cy.get('[data-cy="input"]').attachFile({ filePath, encoding, mimeType });
      cy.get('li').contains(filePath);
    });
  });
});
