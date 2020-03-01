export default function handleInput({ window, subject, force }, { files }) {
  const dataTransfer = new window.DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));

  const input = subject[0];
  input.files = dataTransfer.files;

  const wrapped = Cypress.cy.wrap(subject, { log: false });
  if (force) {
    wrapped.trigger('change', {
      force: true,
    });
  }

  return wrapped;
}
