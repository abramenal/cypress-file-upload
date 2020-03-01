import { DEFAULT_PROCESSING_OPTIONS } from './constants';

import getHandler from './handlers';
import { getFilesToUploadAsync, getFixturesInfo, getForceValueAsync } from './helpers';
import { validateFixtures, validateFiles, validateOptions } from './validators';

import { merge } from '../lib/object';

/**
 * @typedef {Object} FixtureData
 * @property {string} filePath - Path to a file within the fixtures folder
 * @property {string} encoding - File encoding
 *
 *
 * @typedef {Object} FileProcessingOptions
 * @property {string?} subjectType - Target element type
 * @property {boolean?} force - Enforce manual event triggers
 * @property {boolean?} allowEmpty – Can a fixture file be empty
 *
 * @function attachFile
 * @description Attaches fixture files to a given element
 * @param {Cypress.Subject} subject Target element
 * @param {String|Array<String>|FixtureData|Array<FixtureData>} fixture Path(s) for fixture file to attach
 * @param {FileProcessingOptions?} processingOptions Object representing processing options
 */
export default function attachFile(subject, fixture, processingOptions) {
  Cypress.cy.window({ log: false }).then(window => {
    const { subjectType, force, allowEmpty } = merge(processingOptions, DEFAULT_PROCESSING_OPTIONS);
    validateOptions({ subjectType, force, allowEmpty });

    const fixturesToAttach = getFixturesInfo(fixture);
    validateFixtures(fixturesToAttach);

    Cypress.Promise.all([getFilesToUploadAsync(fixturesToAttach), getForceValueAsync(subject, force)]).then(
      ([filesToUpload, forceValue]) => {
        validateFiles(filesToUpload, allowEmpty);

        const handleFileUpload = getHandler(subject, subjectType);

        Cypress.log({
          name: 'upload',
          displayName: 'UPLOAD',
          message: filesToUpload.map(i => i.name).join(', '),
          consoleProps: () => ({
            subjectType,
            files: filesToUpload,
            force,
            allowEmpty,
          }),
        });

        return handleFileUpload({ window, subject, force: forceValue }, { files: filesToUpload });
      },
    );
  });
}
