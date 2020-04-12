import { DEFAULT_PROCESSING_OPTIONS } from './constants';

import { attachFileToElement, getFixtureInfo, getForceValue } from './helpers';
import { validateFixture, validateFile, validateOptions } from './validators';

import { getFileBlobAsync, getFileMimeType, getFileEncoding, getFileContent } from '../lib/file';
import { merge } from '../lib/object';

export default function attachFile(subject, fixture, processingOptions) {
  const { subjectType, force, allowEmpty } = merge(processingOptions, DEFAULT_PROCESSING_OPTIONS);
  validateOptions({ subjectType, force, allowEmpty });

  const fixtureToAttach = getFixtureInfo(fixture);
  validateFixture(fixtureToAttach);

  const { filePath, encoding, mimeType, fileName } = fixtureToAttach;

  const fileMimeType = mimeType || getFileMimeType(filePath);
  const fileEncoding = encoding || getFileEncoding(filePath);
  const forceValue = force || getForceValue(subject);

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

  return Cypress.cy.wrap(subject, { log: false });
}
