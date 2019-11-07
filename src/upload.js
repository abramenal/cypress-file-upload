import getHandler from './handlers';
import { createFilesAsync, ensureDefaults } from './helpers';
import { validateEncoding, validateSubject, validateFiles, validateOptions } from './validators';

const PROCESSING_OPTIONS_DEFAULTS = {
  subjectType: 'input',
  subjectNature: 'dom',
  force: false,
  allowEmpty: false,
};

export default (subject, fileOrArray, processingOptions) =>
  cy.window({ log: false }).then(async window => {
    const { subjectType, subjectNature, force, allowEmpty } = ensureDefaults(
      processingOptions,
      PROCESSING_OPTIONS_DEFAULTS,
    );
    validateOptions({ subjectType, subjectNature, force, allowEmpty });
    /* Subject validation depends on options validation so required to go in this exact order */
    validateSubject({ subject, subjectNature, subjectType });
    validateFiles(fileOrArray, allowEmpty);

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
        allowEmpty,
      }),
    });

    const handleFileUpload = getHandler({ subjectType, subjectNature });
    handleFileUpload({ window, subject, force }, { files: filesToUpload });
  });
