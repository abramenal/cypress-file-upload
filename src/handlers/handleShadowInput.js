export default ({ subject }, { files }) => {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  const input = subject[0];
  input.files = dataTransfer.files;

  return subject[0].dispatchEvent(new CustomEvent('change'));
};
