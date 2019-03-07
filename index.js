Cypress.Commands.add(
  'upload',
  { prevSubject: 'element' },
  (subject, { fileContent, fileName, mimeType }, { uploadType = 'drag-n-drop' }) =>
    cy.window().then(window =>
      Cypress.Blob.base64StringToBlob(fileContent, mimeType)
        .then(blob => new window.File([blob], fileName, { type: mimeType }))
        .then(testFile => {
          const handlerMap = {
            'drag-n-drop': handleDragDrop,
            input: handleInput,
          };

          return handlerMap[uploadType]();

          /* Upload handlers prior to selected upload type */
          function handleDragDrop() {
            cy.wrap(subject).trigger('drop', {
              dataTransfer: {
                files: [testFile],
                types: ['Files'],
              },
            });
          }

          function handleInput() {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(testFile);
            const input = subject[0];
            input.files = dataTransfer.files;
          }
        }),
    ),
);
