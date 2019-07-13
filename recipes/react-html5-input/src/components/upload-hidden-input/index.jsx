import React from 'react';

export default ({ onClick }) => (
  <div className="hidden-uploader">
    <div className="upload-button">Upload</div>
    <div className="upload-wrapper">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={e => onClick(e.target.files)}
        data-cy="hidden-input"
        multiple
      />
    </div>
  </div>
);
