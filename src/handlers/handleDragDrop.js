export default ({ subject, force, events }, { files }) => {
  const eventPayload = {
    force,
    dataTransfer: {
      files,
      types: ['Files'],
    },
  };

  const wrappedSubject = cy.wrap(subject, { log: false });
  events.forEach(event => {
    wrappedSubject.trigger(event, eventPayload);
  });

  return wrappedSubject;
};
