import { DEFAULT_PROCESSING_OPTIONS } from './constants';

import { attachFileToElement, getFixtureInfo, getForceValue } from './helpers';
import { validateFixture, validateFile, validateOptions } from './validators';

import { getFileBlobAsync, getFileMimeType, getFileEncoding } from '../lib/file';
import { merge } from '../lib/object';

export default function attachFile(subject, fixture, processingOptions) {
  const { subjectType, force, allowEmpty } = merge(processingOptions, DEFAULT_PROCESSING_OPTIONS);
  validateOptions({ subjectType, force, allowEmpty });

  const fixtureToAttach = getFixtureInfo(fixture);
  validateFixture(fixtureToAttach);

  const { filePath, encoding } = fixtureToAttach;

  const mimeType = getFileMimeType(filePath);
  const fileEncoding = encoding || getFileEncoding(filePath);
  const forceValue = force || getForceValue(subject);

  Cypress.cy.fixture(filePath, fileEncoding).then(fileContent => {
    return getFileBlobAsync({ filePath, fileContent, mimeType, encoding: fileEncoding }).then(file => {
      validateFile(file, allowEmpty);

      attachFileToElement(subject, { file, subjectType, force: forceValue });

      Cypress.log({
        name: 'attachFile',
        displayName: 'FILE',
        message: file.name,
      });
    });
  });

  return Cypress.cy.wrap(subject, { log: false });
}
