import React, { useState } from 'react';

import UploadDropzone from './upload-dropzone';

/* eslint-disable no-console */
export default () => {
  const [fileDrop = [], setFileDrop] = useState();
  const [hiddenFileDrop = [], setHiddenFileDrop] = useState();

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
              <li key={i.name} className="regular">
                {i.name}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Via hidden react-dropzone:</h2>
          <UploadDropzone
            hidden
            onDrop={files => {
              setHiddenFileDrop(Array.from(files));
              console.log(files);
            }}
          />
          <ul>
            {hiddenFileDrop.map(i => (
              <li key={i.name} className="hidden">
                {i.name}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};
/* eslint-enable no-console */
