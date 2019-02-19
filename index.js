Cypress.Commands.add(
  'upload',
  { prevSubject: 'element' },
  (subject, file, fileName, mimeType) => {
    return cy.window().then(window => {
      return Cypress.Blob.base64StringToBlob(file, mimeType).then(blob => {
        const testFile = new window.File([blob], fileName, { type: mimeType });
        cy.wrap(subject).trigger('drop', {
          dataTransfer: {
            files: [testFile],
            types: ['Files'],
          },
        });
        return new Cypress.Promise(resolve => resolve());
      });
    });
  }
);
