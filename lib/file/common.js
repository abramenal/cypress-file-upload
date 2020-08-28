export const wrapBlob = blob => {
  // Cypress version 5 assigns a function with a compatibility warning
  // to blob.then, but that makes the Blob actually thenable. We have
  // to remove that to Promise.resolve not treat it as thenable.
  if (blob instanceof Cypress.Promise) {
    return blob;
  }

  // eslint-disable-next-line no-param-reassign
  delete blob.then;
  return Cypress.Promise.resolve(blob);
};

export default { wrapBlob };
