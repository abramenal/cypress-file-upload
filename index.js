Cypress.Commands.add(
  'upload',
  { prevSubject: 'element' },
  (subject, file, fileName, mimeType) => {
    cy.window().then(window => {
      return Cypress.Blob.base64StringToBlob(file, mimeType)
        .then(blob => new window.File([blob], fileName, { type: mimeType }))
        .then(testFile => {
          cy.wrap(subject).trigger('drop', {
            dataTransfer: {
              files: [testFile],
              types: ['Files'],
            },
          });
        });
    });
  }
);
