export default function handleShadowDragDrop({ window, subject, force }, { files }) {
  const dataTransfer = new window.DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));

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
