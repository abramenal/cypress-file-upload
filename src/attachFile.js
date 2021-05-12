import { DEFAULT_PROCESSING_OPTIONS } from './constants';

import { attachFileToElement, getFileInfo, getForceValue } from './helpers';
import { validateFixture, validateFile, validateOptions } from './validators';
import { resolveFile } from '../lib/file';
import { merge } from '../lib/object';

export default function attachFile(subject, fileOrFileArray, processingOptions) {
  const { subjectType, force, allowEmpty } = merge(processingOptions, DEFAULT_PROCESSING_OPTIONS);
  validateOptions({
    subjectType,
    force,
    allowEmpty,
  });

  const filesArray = Array.isArray(fileOrFileArray) ? fileOrFileArray : [fileOrFileArray];
  const filesToUpload = filesArray.map(getFileInfo).filter(validateFixture);

  Cypress.cy.window({ log: false }).then(window => {
    const forceValue = force || getForceValue(subject);

    Cypress.Promise.all(filesToUpload.map(f => resolveFile(f, window))) // resolve files
      .then(files => files.filter(f => validateFile(f, allowEmpty))) // error if any of the file contents are invalid
      .then(files => {
        attachFileToElement(subject, {
          files,
          subjectType,
          force: forceValue,
          window,
        });
        return files;
      })
      .then(files =>
        Cypress.log({
          name: 'attachFile',
          displayName: 'FILE',
          message: files.reduce((acc, f) => `${acc.length > 0 ? `${acc}, ` : acc}${f.name}`, ''),
        }),
      );
  });

  return Cypress.cy.wrap(subject, { log: false });
}
