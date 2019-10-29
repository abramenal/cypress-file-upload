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
    .trigger('dragover', eventPayload)
    .trigger('dragenter', eventPayload)
    .trigger('drop', eventPayload)
};
