import getFileBlob from './helpers/getFileBlob';
import getValidEncoding from './helpers/getValidEncoding';
import { InternalError, ERR_TYPES } from './error';

import { getHandler } from './handlers';

export default (subject, fileOrArray, { subjectType = 'input', force = false }) =>
  cy.window({ log: false }).then(async window => {
    const filesToProcess = Array.isArray(fileOrArray) ? fileOrArray : [fileOrArray];
    const processedFiles = await Cypress.Promise.all(
      filesToProcess.map(async ({ fileContent, fileName, mimeType, encoding }) => {
        if (!fileName) {
          throw new InternalError(ERR_TYPES.MISSING_FILENAME);
        }

        const validEncoding = encoding || getValidEncoding(fileName);
        if (!validEncoding) {
          throw new InternalError(ERR_TYPES.MISSING_ENCODING);
        }

        const blob = getFileBlob({ fileContent, mimeType, encoding: validEncoding });
        return new window.File([blob], fileName, { type: mimeType });
      }),
    );

    Cypress.log({
      name: 'upload',
      displayName: 'UPLOAD',
      message: filesToProcess.map(i => i.fileName).join(', '),
      consoleProps: () => ({
        subjectType,
        files: filesToProcess,
        force,
      }),
    });

    const handleFileUpload = getHandler(subjectType);
    return handleFileUpload({ window, subject }, { files: processedFiles, force });
  });
