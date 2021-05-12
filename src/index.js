import attachFile from './attachFile';
import attachFixtureFile from "./attachFixtureFile";

const initialize = () => {
  Cypress.Commands.add('attachFile', { prevSubject: true }, attachFile);
  Cypress.Commands.add('attachFixtureFile', { prevSubject: true }, attachFixtureFile());
};

initialize();
