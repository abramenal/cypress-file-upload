import getEncoding from './getEncoding';
import getFileBlobAsync from './getFileBlobAsync';

export default ({ files, validator, constructor }) =>
  Cypress.Promise.all(
    files.map(async ({ fileContent, fileName, mimeType, encoding = getEncoding(fileName) }) => {
      validator({ fileContent, fileName, mimeType, encoding });

      const blob = await getFileBlobAsync({ fileContent, mimeType, encoding });
      return constructor([blob], fileName, { type: mimeType });
    }),
  );
