import React from 'react';

import UploadDropzone from './upload-dropzone';
import UploadInput from './upload-input';

const onSubmit = files => {
  /* Any side effect to process the file */

  console.log(files);
};

export default () => {
  const [fileInput = [], setFileInput] = React.useState();
  const [fileDrop = [], setFileDrop] = React.useState();
  return <>
    <header>
      <h1>Examples</h1>
    </header>
    <main>
      <section>
        <h2>Via plain html5 input:</h2>
        <UploadInput onSelect={(files) => {
          setFileInput(Array.from(files));
        }} />
        <ul>
          {fileInput.map(i => <li>{i.name}</li>)}
        </ul>
      </section>

      <section>
        <h2>Via react-dropzone:</h2>
        <UploadDropzone onDrop={(files) => {
          setFileDrop(Array.from(files));
        }} />
        <ul>
          {fileDrop.map(i => <li>{i.name}</li>)}
        </ul>
      </section>

      <section>
        <p>more to come...</p>
      </section>
    </main>
  </>
};
