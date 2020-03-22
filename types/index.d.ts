/// <reference types="cypress" />

declare namespace Cypress {
  interface FixtureData {
    filePath: String;
    encoding?: String;
  }

  interface FileProcessingOptions {
    subjectType?: 'input' | 'drag-n-drop';
    force?: boolean;
    allowEmpty?: boolean;
  }

  interface Chainable<Subject> {
    /**
     * Command to attach file(s) to given HTML element as subject
     * @param fixture file to attach
     * @param processingOpts affects the way of fixture processing
     */
    attachFile(fixture: String | FixtureData, processingOpts?: FileProcessingOptions): Chainable<Subject>;
  }
}
