import React, { useState, useCallback, useEffect } from 'react';
import Uppy from '@uppy/core'
import { useUppy, DragDrop } from '@uppy/react'

/* eslint-disable no-console */
export default () => {
  const [uploads = [], setUploads] = useState();

  const uppy = useUppy(()=>{
    return new Uppy()
  })

  const setUploadsFromUppy = useCallback((file) => {
    setUploads(uppy.getFiles())
  }, [setUploads, uppy])

  useEffect(() => {
    uppy.on('file-added', setUploadsFromUppy)
    return () => {
      uppy.off('file-added', setUploadsFromUppy)
    }
  }, [uppy, setUploadsFromUppy])

  return (
    <>
      <header>
        <h1>Examples</h1>
      </header>
      <main>
        <section>
          <h2>Via uppy drag-drop:</h2>
          <DragDrop uppy={uppy} data-cy='dropzone'/>
          <ul>
            {uploads.map(i => (
              <li key={i.name}>
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
