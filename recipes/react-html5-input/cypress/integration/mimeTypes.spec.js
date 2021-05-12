describe('Uploads a file with certain MIME type', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const files = [
    {
      testFileExt: 'PNG',
      fixturePath: 'cy.png',
      filePath: 'cypress/fixtures/cy.png',
    },
    {
      testFileExt: 'CSV (ASCII)',
      fixturePath: 'test.ascii.csv',
      filePath: 'cypress/fixtures/cy.png',
      encoding: 'ascii',
    },
    {
      testFileExt: 'CSV (UTF8)',
      fixturePath: 'test.utf8.csv',
      filePath: 'cypress/fixtures/cy.png',
    },
    {
      testFileExt: 'JSON',
      fixturePath: 'test.json',
      filePath: 'cypress/fixtures/cy.png',
    },
    {
      testFileExt: 'SVG',
      fixturePath: 'test.svg',
      filePath: 'cypress/fixtures/cy.png',
      mimeType: 'text/csv',
    },
  ];

  files.forEach(({ testFileExt, fixturePath, filePath, encoding, mimeType }) => {
    it(`successfully uploads a ${testFileExt} file`, () => {
      cy.get('[data-cy="input"]').attachFile({ filePath, encoding, mimeType });
      cy.get('li').contains(filePath);
    });
    it(`successfully uploads a ${testFileExt} fixture`, () => {
      cy.get('[data-cy="input"]').attachFixture({ fixturePath, encoding, mimeType });
      cy.get('li').contains(fixturePath);
    });
  });
});
