/// <reference types="cypress" />

declare namespace Cypress {
  interface FixtureData {
    filePath: String;
    encoding?: String;
  }

  interface FileProcessingOptions {
    subjectType: 'input' | 'drag-n-drop';
    force?: boolean;
    allowEmpty?: boolean;
  }

  interface Chainable<Subject> {
    /**
     * Command to attach file(s) to given HTML element as subject
     * @param fixture Path(s) for fixture file to attach
     * @param processingOpts Object representing processing options
     */
    attachFile(
      fixture: String | Array<String> | FixtureData | Array<FixtureData>,
      processingOpts?: FileProcessingOptions,
    ): Chainable<Subject>;
  }
}
