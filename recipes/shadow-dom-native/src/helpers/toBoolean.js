export default booleanString => {
  if (booleanString === 'false') return false;
  if (booleanString === 'true') return true;
  throw new Error('Error converting string to boolean');
};
