export default ({ fileContent, mimeType, encoding }) => {
  const asyncEncodingToBlobGetterMap = {
    ascii: () => Promise.resolve(fileContent),
    utf8: () => Promise.resolve(fileContent),
    base64: () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
    default: () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
  };

  return (asyncEncodingToBlobGetterMap[encoding] || asyncEncodingToBlobGetterMap.default)();
};
