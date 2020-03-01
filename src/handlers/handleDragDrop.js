const EVENTS_TO_DISPATCH = ['dragstart', 'drag', 'dragenter', 'drop', 'dragleave', 'dragend'];

export default function handleDragDrop({ window, subject, force }, { files }) {
  const dataTransfer = new window.DataTransfer();

  files.forEach(file => {
    dataTransfer.items.add(file);
  });

  const eventPayload = {
    force: true,
    dataTransfer,
  };

  const wrapped = cy.wrap(subject, { log: false });
  if (force) {
    EVENTS_TO_DISPATCH.forEach(event => {
      wrapped.trigger(event, eventPayload);
    });
  }

  return wrapped;
}
