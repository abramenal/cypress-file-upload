declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Command to upload a file to the given element
     * @param file File contents to upload
     * @param fileName File name to use for the upload
     * @param mimeType MIME type of the uploaded file
     */
    upload(file, fileName, mimeType): Chainable<Subject>;
  }
}
