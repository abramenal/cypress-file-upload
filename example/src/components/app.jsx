import React from 'react';

import UploadDropzone from './upload-dropzone';

const onSubmit = file => {
  /* Any side effect to process the file */

  console.log(file);
};

export default () => (
  <>
    <header>
      <h1>Examples</h1>
    </header>
    <main>
      <section>
        <h2>Via react-dropzone:</h2>
        <UploadDropzone onDrop={onSubmit} />
      </section>

      <section>
        <p>more to come...</p>
      </section>
    </main>
  </>
);
