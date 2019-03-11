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

Cypress.Commands.add('uploadFiles', { prevSubject: 'element' }, (subject, files, { uploadType = 'drag-n-drop' }) =>
  cy.window().then(async window => {
    const handlerMap = {
      'drag-n-drop': handleDragDrop,
      input: handleInput,
    };

    const testFiles = await Promise.all(
      files.map(async ({ fileContent, fileName, mimeType }) => {
        const blob = await Cypress.Blob.base64StringToBlob(fileContent, mimeType);
        return new window.File([blob], fileName, { type: mimeType });
      }),
    );

    handlerMap[uploadType]();

    /* Upload handlers prior to selected upload type */
    function handleDragDrop() {
      cy.wrap(subject).trigger('drop', {
        dataTransfer: {
          files: testFiles,
          types: ['Files'],
        },
      });
    }

    function handleInput() {
      const dataTransfer = new DataTransfer();
      testFiles.forEach(testFile => dataTransfer.items.add(testFile));
      const input = subject[0];
      input.files = dataTransfer.files;
    }
  }),
);
