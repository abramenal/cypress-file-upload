import attachFile from './attachFile';
import attachFixture from './attachFixture';

const initialize = () => {
  Cypress.Commands.add('attachFile', { prevSubject: true }, attachFile);
  Cypress.Commands.add('attachFixture', { prevSubject: true }, attachFixture);
};

initialize();
