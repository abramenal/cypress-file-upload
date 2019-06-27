export default ({ subject }, { files }) => {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));

  return subject[0].dispatchEvent(
    new CustomEvent('change', {
      detail: {
        files: dataTransfer.files,
      },
    }),
  );
};
