import React from 'react';
import Dropzone from 'react-dropzone';

export default ({ onDrop }) => (
  <Dropzone onDrop={accepted => onDrop(accepted)}>
    {({ getRootProps, getInputProps, isDragActive }) => (
      <div {...getRootProps()} data-cy="dropzone">
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
