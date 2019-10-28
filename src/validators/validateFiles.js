import { ERR_TYPES, InternalError } from '../error';

export default fileOrArray => {
  const filesToValidate = Array.isArray(fileOrArray) ? fileOrArray : [fileOrArray];
  /* Note: "encoding" field is not mandatory */
  filesToValidate.forEach(({ fileContent, fileName, mimeType }) => {
    if (fileContent === undefined || !fileName || !mimeType) {
      throw new InternalError(ERR_TYPES.INVALID_FILE);
    }
  });
};
