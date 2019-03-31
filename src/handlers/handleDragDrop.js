export default ({ subject }, { files }) =>
  cy.wrap(subject, { log: false }).trigger('drop', {
    dataTransfer: {
      files,
      types: ['Files'],
    },
  });
