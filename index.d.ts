declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Command to upload a file to the given element
     * @param file Object represents necessary file info
     * @param options Object represents processing options
     */
    upload(
      file: { fileContent: string; fileName: string; mimeType: string },
      options: { uploadType: string },
    ): Chainable<Subject>;
  }
}
