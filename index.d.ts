declare namespace Cypress {
  interface FileData {
    fileContent: string;
    fileName: string;
    mimeType: string;
  }

  interface FileProcessingOptions {
    subjectType: string;
  }

  interface Chainable<Subject> {
    /**
     * Command to upload file(s) using given HTML element as subject
     * @param fileOrArray Single or multiple object(s) representing file data
     * @param processingOpts Object representing processing options
     */
    upload(fileOrArray: FileData | FileData[], processingOpts: FileProcessingOptions): Chainable<Subject>;
  }
}
