export default ({ fileContent, mimeType, encoding }) => {
  const fileEncodingToBlobGetterMap = {
    base64: async () => Cypress.Blob.base64StringToBlob(fileContent, mimeType),
    utf8: async () => fileContent,
    default: async () => fileContent,
  };

  return (fileEncodingToBlobGetterMap[encoding] || fileEncodingToBlobGetterMap.default)();
};
