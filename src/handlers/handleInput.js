import { isManualEventTrigger } from '../helpers';

export default ({ window, subject, force }, { files }) => {
  const dataTransfer = new window.DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  const input = subject[0];
  input.files = dataTransfer.files;

  if (isManualEventTrigger({ window, force })) {
    return cy.wrap(subject).trigger('change', {
      force: true,
    });
  }

  return null;
};
