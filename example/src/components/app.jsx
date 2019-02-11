import React from 'react';

import UploadDropzone from './upload-dropzone';
import UploadForm from './upload-form';

const onSubmit = files => {
  console.log(files);
};

export default () => (
  <>
    <header>
      <h1>Examples</h1>
    </header>
    <main>
      <section>
        <h2>Via plain HTML form:</h2>
        <UploadForm onSubmit={onSubmit} />
      </section>
      <section>
        <h2>Via react-dropzone:</h2>
        <UploadDropzone onDrop={onSubmit} />
      </section>
    </main>
  </>
);
