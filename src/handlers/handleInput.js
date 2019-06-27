import { isManualEventTrigger } from '../helpers';

export default ({ window, subject, force }, { files }) => {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  const input = subject[0];
  input.files = dataTransfer.files;

  if (isManualEventTrigger({ window, force })) {
    return cy.wrap(subject, { log: false }).trigger('change', {
      force: true,
    });
  }

  return null;
};
