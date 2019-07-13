import React, { useState } from 'react';

import UploadDropzone from './upload-dropzone';

/* eslint-disable no-console */
export default () => {
  const [fileDrop = [], setFileDrop] = useState();

  return (
    <>
      <header>
        <h1>Examples</h1>
      </header>
      <main>
        <section>
          <h2>Via react-dropzone:</h2>
          <UploadDropzone
            onDrop={files => {
              setFileDrop(Array.from(files));
              console.log(files);
            }}
          />
          <ul>
            {fileDrop.map(i => (
              <li>{i.name}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};
/* eslint-enable no-console */
