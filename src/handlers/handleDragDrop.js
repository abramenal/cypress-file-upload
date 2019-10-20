export default ({ subject, force }, { files }) => {
  return cy
    .wrap(subject, { log: false })
    .trigger('dragenter', {
      force,
      dataTransfer: {
        files,
        types: ['Files'],
      },
    })
    .trigger('drop', {
      force,
      dataTransfer: {
        files,
        types: ['Files'],
      },
    })
    .trigger('dragleave', {
      force,
      dataTransfer: {
        files,
        types: ['Files'],
      },
    });
};
