import getHandler from './handlers';
import { createFilesAsync, ensureDefaults } from './helpers';
import { validateEncoding, validateSubject, validateFiles, validateOptions } from './validators';

const PROCESSING_OPTIONS_DEFAULTS = {
  subjectType: 'input',
  subjectNature: 'dom',
  force: false,
  allowEmpty: false,
  events: ['dragcenter', 'drop', 'dragleave'],
};

export default (subject, fileOrArray, processingOptions) =>
  cy.window({ log: false }).then(async window => {
    const { subjectType, subjectNature, force, allowEmpty, events } = ensureDefaults(
      processingOptions,
      PROCESSING_OPTIONS_DEFAULTS,
    );
    validateOptions({ subjectType, subjectNature, force, allowEmpty, events });

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
        events,
      }),
    });

    const handleFileUpload = getHandler({ subjectType, subjectNature });
    handleFileUpload({ window, subject, force, events }, { files: filesToUpload });
  });
