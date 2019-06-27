import upload from './upload';

export default () => {
  Cypress.Commands.add('upload', { prevSubject: true }, upload);
};
