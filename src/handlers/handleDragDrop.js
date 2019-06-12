export default ({ subject }, { files, force }) =>
  cy.wrap(subject, { log: false }).trigger('drop', {
    force,
    dataTransfer: {
      files,
      types: ['Files'],
    },
  });
