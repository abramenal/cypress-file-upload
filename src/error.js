export const ERR_TYPES = {
  MISSING_FILENAME: {
    message: '"fileName" is empty',
    tip: 'You should provide valid "fileName" string for parsing',
  },
  MISSING_ENCODING: {
    message: 'file encoding could not be determined automatically',
    tip: 'You should either recheck "fileName" for any typos or provide the "encoding" for such file type manually',
  },
  INVALID_SUBJECT: {
    message: 'passed subject element is not valid',
    tip: 'If "subjectType" is "input", subject should be a valid HTML <input /> element',
  },
  INVALID_SUBJECT_TYPE: {
    message: '"subjectType" is not valid',
    tip: 'Please look into docs to find supported "subjectType" values',
  },
  INVALID_SUBJECT_NATURE: {
    message: '"subjectNature" is not valid',
    tip: 'Please look into docs to find supported "subjectNature" values',
  },
  INVALID_FORCE: {
    message: '"force" is not valid',
    tip: 'Please look into docs to find supported "force" values',
  },
  INVALID_ALLOW_EMPTY: {
    message: '"allowEmpty" is not valid',
    tip: 'Please look into docs to find supported "allowEmpty" values',
  },
  INVALID_FILE: {
    message: 'One or more field is invalid within given file(s)',
    tip: 'Please look into docs to find supported "fileOrArray" values',
  },
  INVALID_ENCODING: {
    message: '"encoding" is not valid',
    tip: 'Please look into docs to find supported "encoding" values',
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
