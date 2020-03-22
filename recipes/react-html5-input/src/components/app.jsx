import React, { useState } from 'react';

import UploadInput from './upload-input';
import UploadHiddenInput from './upload-hidden-input';

/* eslint-disable no-console */
export default () => {
  const [fileInput = [], setFileInput] = useState();
  const [hiddenFileInput = [], setHiddenFileInput] = useState();

  return (
    <>
      <header>
        <h1>Examples</h1>
      </header>
      <main>
        <section>
          <h2>Via regular html5 input:</h2>
          <UploadInput
            onSelect={files => {
              setFileInput(Array.from(files));
              console.log(files);
            }}
          />
          <ul>
            {fileInput.map(i => (
              <li key={i.name} className="regular">
                {i.name}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Via hidden html5 input:</h2>
          <UploadHiddenInput
            onClick={files => {
              setHiddenFileInput(Array.from(files));
              console.log(files);
            }}
          />
          <ul>
            {hiddenFileInput.map(i => (
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
