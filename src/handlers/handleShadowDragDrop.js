export default ({ window, subject }, { files }) => {
  const dataTransfer = new window.DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));

  return subject[0].dispatchEvent(
    new window.CustomEvent('change', {
      detail: {
        files: dataTransfer.files,
      },
    }),
  );
};
