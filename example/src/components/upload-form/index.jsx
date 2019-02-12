import React from 'react';

export default ({ onSubmit }) => (
  <form
    data-cy="form"
    action=""
    onSubmit={e => {
      const inputEl = document.getElementById('file-input');
      onSubmit(inputEl.files);
      e.preventDefault();
    }}
  >
    <input type="file" name="file-input" id="file-input" data-cy="file-input" />
    <br />
    <input type="submit" value="Upload" name="submit" data-cy="file-submit" />
  </form>
);
