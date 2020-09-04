import { DEFAULT_PROCESSING_OPTIONS } from './constants';

import { attachFileToElement, getFixtureInfo, getForceValue, triggerEvents } from './helpers';
import { validateFixture, validateFile, validateOptions } from './validators';

import { getFileBlobAsync, getFileMimeType, getFileEncoding, getFileContent } from '../lib/file';
import { merge } from '../lib/object';

export default function attachFile(subject, fixtures, processingOptions) {
  const { subjectType, force, allowEmpty } = merge(processingOptions, DEFAULT_PROCESSING_OPTIONS);
  validateOptions({ subjectType, force, allowEmpty });

  fixtures = Array.isArray(fixtures) ? fixtures : [fixtures];

  const forceValue = force || getForceValue(subject);

  // First we attach the files
  fixtures.forEach(fixture => {
    const fixtureToAttach = getFixtureInfo(fixture);
    validateFixture(fixtureToAttach);

    const { filePath, encoding, mimeType, fileName } = fixtureToAttach;

    const fileMimeType = mimeType || getFileMimeType(filePath);
    const fileEncoding = encoding || getFileEncoding(filePath);

    Cypress.cy.window({ log: false }).then(window => {
      return getFileContent({ filePath, fileContent: fixtureToAttach.fileContent, fileEncoding }).then(fileContent => {
        return getFileBlobAsync({ fileContent, fileName, mimeType: fileMimeType, encoding: fileEncoding, window }).then(
          file => {
            validateFile(file, allowEmpty);

            attachFileToElement(subject, { file, subjectType, force: forceValue, window });

            Cypress.log({
              name: 'attachFile',
              displayName: 'FILE',
              message: file.name,
            });
          },
        );
      });
    });
  });

  // Then we trigger the events
  Cypress.cy.window({ log: false }).then(window => {
    triggerEvents(subject, { subjectType, force: forceValue, window });
  });

  return Cypress.cy.wrap(subject, { log: false });
}
