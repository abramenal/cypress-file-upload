export default ({ subject, force }, { files }) => {
  cy.wrap(subject, { log: false }).trigger('dragenter', {
    force,
    dataTransfer: {
      files,
      types: ['Files'],
    },
  });
  cy.wrap(subject, { log: false }).trigger('drop', {
    force,
    dataTransfer: {
      files,
      types: ['Files'],
    },
  });
};
