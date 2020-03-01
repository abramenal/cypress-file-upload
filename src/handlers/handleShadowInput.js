export default function handleShadowInput({ window, subject, force }, { files }) {
  const dataTransfer = new window.DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));

  const input = subject[0];
  input.files = dataTransfer.files;

  if (force) {
    subject[0].dispatchEvent(
      new window.CustomEvent('change', {
        detail: {
          files: dataTransfer.files,
        },
      }),
    );
  }

  return subject;
}
