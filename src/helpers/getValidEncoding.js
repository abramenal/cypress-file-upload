import { InternalError, ERR_TYPES } from '../error';

export default fileName => {
  /*
   * Mostly was copied from https://github.com/cypress-io/cypress/blob/develop/packages/server/lib/fixture.coffee#L94
   */
  const extensionToEncodingMap = {
    json: 'utf8',
    js: 'utf8',
    coffee: 'utf8',
    html: 'utf8',
    txt: 'utf8',
    csv: 'utf8',
    png: 'base64',
    jpg: 'base64',
    jpeg: 'base64',
    gif: 'base64',
    tif: 'base64',
    tiff: 'base64',
    zip: 'base64',
  };

  const extension = fileName.slice(fileName.indexOf('.') + 1);

  if (extensionToEncodingMap[extension]) {
    return extensionToEncodingMap[extension];
  }

  throw new InternalError(ERR_TYPES.UNABLE_TO_DECODE);
};
