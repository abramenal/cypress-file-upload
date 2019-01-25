Cypress.Commands.add('upload', { prevSubject: 'element' }, (subject, file, fileName, mimeType) => {
  cy.window().then(window => {
    Cypress.Blob.base64StringToBlob(file, mimeType).then(blob => {
      const testFile = new window.File([blob], fileName, { type: mimeType });
      cy.wrap(subject).trigger('drop', {
        dataTransfer: {
          files: [testFile],
          types: ['Files'],
        },
      });
    });
  });
});
