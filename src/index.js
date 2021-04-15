import attachFile from './attachFile';
import attachFolder from './attachFolder';

const initialize = () => {
  Cypress.Commands.add('attachFile', { prevSubject: true }, attachFile);
  Cypress.Commands.add('attachFolder', { prevSubject: true }, attachFolder);
};

initialize();
