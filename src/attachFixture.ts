import { DEFAULT_PROCESSING_OPTIONS, HtmlSubjectType } from './constants';

import { attachFileToElement, getFixtureInfo, getForceValue, FixtureInfo } from './helpers';
import { validateFixture, validateFile, validateOptions } from './validators';
import { resolveFixture } from '../lib/file';
import { merge } from '../lib/object';

interface CommandProcessingOptions {
  subjectType: HtmlSubjectType;
  force: boolean;
  allowEmpty: boolean;
}

export default function attachFixture(
  subject: JQuery<HTMLElement>,
  fixtureOrFixtureArray: FixtureInfo | Array<FixtureInfo>,
  processingOptions?: CommandProcessingOptions,
) {
  const { subjectType, force, allowEmpty } = merge(processingOptions, DEFAULT_PROCESSING_OPTIONS);
  validateOptions({
    subjectType,
    force,
    allowEmpty,
  });

  const fixturesArray = Array.isArray(fixtureOrFixtureArray) ? fixtureOrFixtureArray : [fixtureOrFixtureArray];
  const fixtures = fixturesArray.map(getFixtureInfo).filter(validateFixture);

  cy.window({ log: false }).then(window => {
    const forceValue = force || getForceValue(subject);

    Cypress.Promise.all(fixtures.map(f => resolveFixture(f, window))) // resolve files
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

  return cy.wrap(subject, { log: false });
}
