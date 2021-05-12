import attachFile from './attachFile';

const initialize = () => {
  Cypress.Commands.add('attachFile', { prevSubject: true }, attachFile);
};

initialize();
