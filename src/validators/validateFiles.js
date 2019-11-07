import { ERR_TYPES, InternalError } from '../error';

export default (fileOrArray, allowEmpty) => {
  const filesToValidate = Array.isArray(fileOrArray) ? fileOrArray : [fileOrArray];
  /* Note: "encoding" field is not mandatory */
  filesToValidate.forEach(({ fileContent, fileName, mimeType }) => {
    const fileContentValid = allowEmpty ? !fileContent : !!fileContent;
    if (!fileContentValid || !fileName || !mimeType) {
      throw new InternalError(ERR_TYPES.INVALID_FILE);
    }
  });
};
