export default ({ window, subject, force, events }, { files }) => {
  const dataTransfer = new window.DataTransfer();

  files.forEach(file => {
    dataTransfer.items.add(file);
  });

  const eventPayload = {
    force,
    dataTransfer,
  };

  const wrappedSubject = cy.wrap(subject, { log: false });
  events.forEach(event => {
    wrappedSubject.trigger(event, eventPayload);
  });

  return wrappedSubject;
};
