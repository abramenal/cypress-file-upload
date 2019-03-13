import React from 'react';

import UploadDropzone from './upload-dropzone';
import UploadInput from './upload-input';

const onSubmit = files => {
  /* Any side effect to process the file */

  console.log(files);
};

export default () => (
  <>
    <header>
      <h1>Examples</h1>
    </header>
    <main>
      <section>
        <h2>Via plain html5 input:</h2>
        <UploadInput onSelect={onSubmit} />
      </section>

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
