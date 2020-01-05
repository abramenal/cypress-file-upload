export default ({ window, subject }, { files }) => {
  const dataTransfer = new window.DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  const input = subject[0];
  input.files = dataTransfer.files;

  return subject[0].dispatchEvent(new window.CustomEvent('change'));
};
