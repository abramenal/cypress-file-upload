import getHandler from './handlers';
import { createFilesAsync } from './helpers';
import { validateEncoding, validateSubject, validateFiles, validateOptions } from './validators';

export default (subject, fileOrArray, { subjectType = 'input', subjectNature = 'dom', force = false }) =>
  cy.window({ log: false }).then(async window => {
    validateOptions({ subjectType, subjectNature, force });
    /* Subject validation depends on options validation so required to go in this exact order */
    validateSubject({ subject, subjectNature, subjectType });
    validateFiles(fileOrArray);

    const filesToUpload = await createFilesAsync({
      files: Array.isArray(fileOrArray) ? fileOrArray : [fileOrArray],
      validator: ({ encoding }) => validateEncoding(encoding),
      constructor: (...args) => new window.File(...args),
    });

    Cypress.log({
      name: 'upload',
      displayName: 'UPLOAD',
      message: filesToUpload.map(i => i.name).join(', '),
      consoleProps: () => ({
        subjectType,
        subjectNature,
        files: filesToUpload,
        force,
      }),
    });

    const handleFileUpload = getHandler({ subjectType, subjectNature });
    handleFileUpload({ window, subject, force }, { files: filesToUpload });
  });
