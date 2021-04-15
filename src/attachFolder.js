import { DEFAULT_PROCESSING_OPTIONS } from './constants';

import { attachFileToElement, getFixtureInfo, getForceValue } from './helpers';
import { validateFixture, validateFile, validateOptions } from './validators';
import { resolveFile } from '../lib/file';
import { merge } from '../lib/object';

export default function attachDirectory(subject, folderName, processingOptions) {
  const { subjectType, force, allowEmpty } = merge(processingOptions, DEFAULT_PROCESSING_OPTIONS);
  validateOptions({
    subjectType,
    force,
    allowEmpty,
  });
  const forceValue = force || getForceValue(subject);

  Cypress.cy.window({ log: false }).then(window => {
    cy.task('readDir', folderName).then(fileNamesArray => {
      const fixtures = fileNamesArray.map(fn => getFixtureInfo(fn, folderName)).filter(validateFixture);

      Cypress.Promise.all(fixtures.map(f => resolveFile(f, window))) // resolve files
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
            name: 'attachDirectory',
            displayName: 'DIRECTORY',
            message: files.reduce((acc, f) => `${acc.length > 0 ? `${acc}, ` : acc}${f.name}`, ''),
          }),
        );
    });
  });

  return Cypress.cy.wrap(subject, { log: false });
}
