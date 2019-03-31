import ERR_TYPES from './errorTypes';

class InternalError extends Error {
  constructor(errorType, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InternalError);
    }

    this.name = '[cypress-file-upload::InternalError]';
    this.message = `${errorType.message} ${errorType.tip}`;
  }
}

export { ERR_TYPES, InternalError };
