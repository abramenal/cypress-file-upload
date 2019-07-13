import React from 'react';

export default ({ onSelect }) => (
  <input type="file" name="image" accept="image/*" onChange={e => onSelect(e.target.files)} data-cy="input" multiple />
);
