import React from 'react';
import Dropzone from 'react-dropzone';

export default ({ onDrop, hidden = false }) => (
  <Dropzone
    onDrop={(accepted, rejected) => {
      onDrop(accepted);
      // eslint-disable-next-line no-console
      console.log(accepted, rejected);
    }}
  >
    {({ getRootProps, getInputProps, isDragActive }) => (
      <div
        {...getRootProps()}
        data-cy={hidden ? 'hidden-dropzone' : 'dropzone'}
        style={hidden ? { display: 'none' } : {}}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here...</p>
        ) : (
          <p>Try dropping some files here, or click to select files to upload.</p>
        )}
      </div>
    )}
  </Dropzone>
);
