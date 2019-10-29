export default ({ subject, force, events }, { files }) => {
  const eventPayload = {
    force,
    dataTransfer: {
      files,
      types: ['Files'],
    },
  };

  const temp = cy.wrap(subject, { log: false });
  events.forEach(event => {
    temp.trigger(event, eventPayload);
  });

  return temp;
};
