/// <reference types="cypress" />

declare namespace Cypress {
  type FixtureData =
    | string
    | {
        filePath: string;
        fileContent?: Blob;
        fileName?: string;
        encoding?: string;
        mimeType?: string;
      }
    | {
        fileContent: Blob;
        fileName: string;
        mimeType: string;
        encoding?: string;
      };

  interface FileProcessingOptions {
    subjectType?: 'input' | 'drag-n-drop';
    force?: boolean;
    allowEmpty?: boolean;
  }

  interface Chainable<Subject = any> {
    /**
     * Command to attach file(s) to given HTML element as subject
     * @param fixture file to attach
     * @param processingOpts affects the way of fixture processing
     */
    attachFile(fixture: FixtureData | FixtureData[], processingOpts?: FileProcessingOptions): Chainable<Subject>;
  }
}
