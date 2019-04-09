export default ({ fileContent, mimeType, encoding }) => {
  const asyncEncodingToBlobGetterMap = {
    base64: () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
    utf8: () => Promise.resolve(fileContent),
    default: () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
  };

  return (asyncEncodingToBlobGetterMap[encoding] || asyncEncodingToBlobGetterMap.default)();
};
