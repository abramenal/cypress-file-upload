import React from 'react';

export default ({ onSelect }) => (
  <input type="file" name="image" accept="image/*" onChange={e => onSelect(e.target.files[0])} data-cy="input" />
);
