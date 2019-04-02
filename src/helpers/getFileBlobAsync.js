export default ({ fileContent, mimeType, encoding }) => {
  const asyncEncodingToBlobGetterMap = {
    base64: () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
    utf8: () => Promise.resolve(fileContent),
    default: () => Promise.resolve(fileContent),
  };

  return (asyncEncodingToBlobGetterMap[encoding] || asyncEncodingToBlobGetterMap.default)();
};
