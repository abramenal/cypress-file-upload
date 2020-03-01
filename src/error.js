export const ERR_TYPES = {
  INVALID_SUBJECT_TYPE: {
    message: '"subjectType" is not valid',
    tip: 'Please look into docs to find supported "subjectType" values',
  },
  INVALID_FORCE: {
    message: '"force" is not valid',
    tip: 'Please look into docs to find supported "force" values',
  },
  INVALID_ALLOW_EMPTY: {
    message: '"allowEmpty" is not valid',
    tip: 'Please look into docs to find supported "allowEmpty" values',
  },
  INVALID_FILE_ENCODING: {
    message: '"file encoding" is not valid',
    tip: 'Please look into docs to find supported "encoding" values',
  },
  INVALID_FILE_PATH: {
    message: '"filePath" is not valid',
    tip: 'Please look into docs to find supported "filePath" values',
  },
  INVALID_FILE: {
    message: 'given fixture file is empty',
    tip: 'Please make sure you provide correct file or explicitly set "allowEmpty" to true',
  },
};

export class InternalError extends Error {
  constructor(errorType, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InternalError);
    }

    this.name = '[cypress-file-upload error]';
    this.message = `${errorType.message}.\n${errorType.tip}`;
  }
}
