import { ENCODING } from '../constants';

export default ({ fileContent, mimeType, encoding }) => {
  const encodingToAsyncGetterMap = {
    [ENCODING.ASCII]: () => Promise.resolve(fileContent),
    [ENCODING.UTF8]: () => Promise.resolve(fileContent),
    [ENCODING.UTF_8]: () => Promise.resolve(fileContent),
    [ENCODING.BASE64]: () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
    'default': () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
  };

  return (encodingToAsyncGetterMap[encoding] || encodingToAsyncGetterMap.default)();
};
