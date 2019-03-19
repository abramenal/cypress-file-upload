Cypress.Commands.add('upload', { prevSubject: 'element' }, (subject, fileOrArray, { subjectType = 'input' }) =>
  cy.window().then(async window => {
    const filesToProcess = Array.isArray(fileOrArray) ? fileOrArray : [fileOrArray];
    const processedFiles = await Cypress.Promise.all(
      filesToProcess.map(async ({ fileContent, fileName, mimeType }) => {
        const blob = await Cypress.Blob.base64StringToBlob(fileContent, mimeType);
        return new window.File([blob], fileName, { type: mimeType });
      }),
    );

    const handlerMap = {
      'drag-n-drop': handleDragDrop,
      input: handleInput,
    };

    return handlerMap[subjectType]();

    /* Upload handlers prior to selected upload type */
    function handleDragDrop() {
      return cy.wrap(subject).trigger('drop', {
        dataTransfer: {
          files: processedFiles,
          types: ['Files'],
        },
      });
    }

    function handleInput() {
      const dataTransfer = new DataTransfer();
      processedFiles.forEach(file => dataTransfer.items.add(file));
      const input = subject[0];
      input.files = dataTransfer.files;
      return cy.wrap(subject).trigger('change');
    }
  }),
);
