export default ({ subject, force }, { files }) => {
  const eventPayload = {
    force,
    dataTransfer: {
      files,
      types: ['Files'],
    },
  };

  return cy
    .wrap(subject, { log: false })
    .trigger('dragenter', eventPayload)
    .trigger('drop', eventPayload)
    .trigger('dragleave', eventPayload);
};
