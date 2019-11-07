/// <reference types="cypress" />

declare namespace Cypress {
  interface FileData {
    fileContent: string;
    fileName: string;
    mimeType: string;
    encoding?: Cypress.Encodings;
  }

  interface FileProcessingOptions {
    subjectType: 'input' | 'drag-n-drop';
    subjectNature?: 'dom' | 'shadow';
    force?: boolean;
    allowEmpty?: boolean;
    events?: Array<string>;
  }

  interface Chainable<Subject> {
    /**
     * Command to upload file(s) using given HTML element as subject
     * @param fileOrArray Single or multiple object(s) representing file data
     * @param processingOpts Object representing processing options
     */
    upload(fileOrArray: FileData | FileData[], processingOpts?: FileProcessingOptions): Chainable<Subject>;
  }
}
